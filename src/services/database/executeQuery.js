import { sybaseConnector } from "./dbConnector";

/**
 * Realiz a a conexão com o BD e consulta o Banco de Dados Sybase
 * utilizando uma Query String.
 * @param {String} queryStr Query String a ser requisitada no BD.
 * @returns Objeto contendo resultados da consulta no BD.
 */
async function executeQuery(queryStr) {
  try {
    if (!(await sybaseConnector.sybase.isConnected())) {
      await sybaseConnector.connect();
    }
    const query = await sybaseConnector.query(queryStr);
    return query;
  } catch (error) {
    console.log(error);
    const query = {
      status: 500,
      message: "ERRO NA EXECUÇÃO DA QUERY",
      error: error.message,
    };
    return query;
  }
}

export { executeQuery };
