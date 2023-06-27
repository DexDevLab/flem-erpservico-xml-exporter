import { executeQuery } from "services/database";

const getFuncionario = async (data) => {
  const query = executeQuery(
    `SELECT * FROM bethadba.foempregados WHERE I_EMPREGADOS = 1`
  );

  return query;
};

export { getFuncionario };
