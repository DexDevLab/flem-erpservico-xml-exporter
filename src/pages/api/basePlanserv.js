import { apiHandler, bdDominioApi } from "services";
import { formMiddleWare } from "utils/formParser";
import { read, utils } from "xlsx";
import { readFileSync } from "fs";
import { replaceCharKeysUtil } from "utils/replaceCharKeysUtil";
import { create as createXml } from "xmlbuilder2";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";
import { TABELA_VALORES_DESCONTO_PLANSERV } from "constants/tabelasPlanserv";

const SHEETS_COLUMNS = [
  "nr_beneficiario",
  "nome_completo",
  "dt_nascimento",
  "nr_cpf",
  "idade",
  "nr_beneficiario_titular",
  "grau_parentesco",
  "forma_pag",
];

export default apiHandler.post(formMiddleWare, async (req, res, next) => {
  const { anexo } = req.files;
  const { mesFaturamento } = req.fields;

  const { filepath } = anexo.toJSON();
  const fileBuffer = readFileSync(filepath);

  const workbook = read(fileBuffer, {
    type: "buffer",
    cellDates: true,
  });

  const sheet = new Array().concat(
    ...workbook.SheetNames.map((sheetName) => {
      const rawRows = utils.sheet_to_json(workbook.Sheets[sheetName], {
        raw: true,
        defval: null,
        rawNumbers: true,
      });

      rawRows.map((row) => replaceCharKeysUtil(row));

      const filterColumns = rawRows.map((row) =>
        Object.fromEntries(
          Object.entries(row).filter(([key]) => SHEETS_COLUMNS.includes(key))
        )
      );

      const rows = filterColumns.filter(
        (row) => Object.keys(row).length === SHEETS_COLUMNS.length
      );

      if (rows.length > 0) {
        return rows;
      }
    }).filter((row) => row)
  );

  const titulares = sheet
    .filter(
      ({ nr_beneficiario, nr_beneficiario_titular }) =>
        nr_beneficiario === nr_beneficiario_titular
    )
    .map((titular) => ({
      ...titular,
      nr_cpf: titular.nr_cpf.toString().padStart(11, 0),
      associados: sheet
        .filter(
          ({ nr_beneficiario, nr_beneficiario_titular }) =>
            nr_beneficiario !== nr_beneficiario_titular &&
            nr_beneficiario_titular === titular.nr_beneficiario
        )
        .map((associado) => ({
          ...associado,
          grau_parentesco: associado.grau_parentesco
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/\//g, "_")
            .replace(/º/g, "_"),
        })),
    }));

  const {
    data: { query: informacoesDominioRh },
  } = await bdDominioApi.post("/funcionarios", {
    cpf: JSON.stringify(titulares.map(({ nr_cpf }) => nr_cpf)),
  });

  const beneficiariosPlanserv = titulares
    .map((titular) => ({
      ...titular,
      informacoesDominioRh: informacoesDominioRh.find(
        ({ cpf }) => cpf.toString() === titular.nr_cpf.toString()
      ),
    }))
    .filter(({ informacoesDominioRh }) => informacoesDominioRh);

  const obj = {
    FOLHA: {
      COD_ORGAO: 97,
      MES_REF: DateTime.fromFormat(mesFaturamento, "yyyy-MM").toFormat(
        "MM/yyyy"
      ),
      VALOR_TOTAL_ORGAO: 0,
      GRUPO_FAMILIAR: beneficiariosPlanserv.map((titular, idx) => ({
        NUM_ASSOCIADO_RESP: titular.nr_beneficiario,
        VAL_BASE_CALCULO:
          TABELA_VALORES_DESCONTO_PLANSERV.find(
            ({ inicioFaixa, fimFaixa }) =>
              inicioFaixa <= titular.informacoesDominioRh?.salario &&
              fimFaixa >= titular.informacoesDominioRh?.salario
          )?.descontoTitular || "NAO CONSTA",
        IND_APOSENTADO: 0,
        NUM_CPF: titular.nr_cpf,
        ASSOCIADO: !isEmpty(titular.associados)
          ? titular.associados.map((associado) => ({
              DATA_NASCIMENTO: DateTime.fromJSDate(
                associado.dt_nascimento
              ).toFormat("dd/MM/yyyy"),
              NUM_ASSOCIADO: associado.nr_beneficiario,
              GRAU_DEPENDENCIA: associado.grau_parentesco,
              PAGAMENTO: {
                TIPO: 1,
                VALOR: TABELA_VALORES_DESCONTO_PLANSERV.find(
                  ({ inicioFaixa, fimFaixa }) =>
                    inicioFaixa <= titular.informacoesDominioRh?.salario &&
                    fimFaixa >= titular.informacoesDominioRh?.salario
                )?.[
                  associado.grau_parentesco.includes("conjuge") ||
                  associado.grau_parentesco.includes("companheir")
                    ? "descontoConjComp"
                    : "descontoOutrosDep"
                ],
              },
            }))
          : [],
      })),
    },
  };

  const valorTotalTitulares = obj.FOLHA.GRUPO_FAMILIAR.map(
    ({ VAL_BASE_CALCULO }) => VAL_BASE_CALCULO
  ).reduce((acc, curr) => acc + curr, 0);
  const valorTotalAssociados = obj.FOLHA.GRUPO_FAMILIAR.filter(
    ({ ASSOCIADO }) => !isEmpty(ASSOCIADO)
  )
    .map(({ ASSOCIADO }) =>
      ASSOCIADO.map(({ PAGAMENTO: { VALOR } }) => VALOR).reduce(
        (acc, curr) => acc + curr,
        0
      )
    )
    .reduce((acc, curr) => acc + curr, 0);

  obj.FOLHA.VALOR_TOTAL_ORGAO = (
    valorTotalTitulares + valorTotalAssociados
  ).toFixed(2);

  const root = createXml(obj);

  const xml = root.end({ prettyPrint: true });

  res.send(xml);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
