import { Button, Stack } from "@chakra-ui/react";
import { FormMaker } from "components/Form";
import download from "downloadjs";
import { useCustomForm } from "hooks";
import { DateTime } from "luxon";
import Head from "next/head";
import { useEffect, useState } from "react";
import { backendApi } from "services";

export default function Home() {
  const [uploadProgress, setUploadProgress] = useState();
  const [uploadController, setUploadController] = useState(null);
  const formDadosPlanserv = useCustomForm();

  const formDadosPlanservInputs = [
    {
      id: "anexo",
      formControl: formDadosPlanserv.control,
      label: "Base de dados Planserv",
      type: "file",
      uploadProgress,
      setUploadProgress,
      uploadController,
      validate: (v) => v.length || "Obrigatório",
      accept: {
        "application/vnd.ms-excel": [],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        "text/csv": [],
      },
    },
    {
      id: "mesFaturamento",
      formControl: formDadosPlanserv.control,
      label: "Mês de Faturamento",
      type: "month",
      required: true,
    },
  ];

  const formDadosPlanservSubmit = async (formData) => {
    formDadosPlanserv.setLoading();

    const data = new FormData();
    const filename = `${DateTime.fromFormat(
      formData.mesFaturamento,
      "yyyy-MM"
    ).toFormat("MM.yyyy")}_Faturamento_Planserv_FLEM.xml`;
    for (const key in formData) {
      if (key === "field") {
        data.append(key, formData[key][1]);
      } else {
        data.append(key, formData[key]);
      }
    }
    const { data: file } = await backendApi.post(`/basePlanserv`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      responseType: "blob",
    });

    download(file, filename, "application/xml");
    formDadosPlanserv.setLoaded();
  };

  useEffect(() => {
    setUploadController(new AbortController());
  }, []);

  return (
    <>
      <Head>
        <title>PLANSERV XML Helper</title>
        <meta
          name="description"
          content="App para gerar arquivo XML de faturamento mensal do PLANSERV"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack bg="white" p={4} rounded="lg" shadow="lg" spacing={2}>
        <FormMaker>{formDadosPlanservInputs}</FormMaker>
        <Button
          onClick={formDadosPlanserv.handleSubmit(formDadosPlanservSubmit)}
          isDisabled={!formDadosPlanserv.validation}
          colorScheme="primary"
          loadingText="Aguarde..."
          isLoading={formDadosPlanserv.isLoading}
        >
          Carregar
        </Button>
      </Stack>
    </>
  );
}

Home.dashboard = true;
