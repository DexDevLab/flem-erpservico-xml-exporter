import { setAuthHeaders, srfApi, storeAuthHeaders } from "services/apiService";

export const authUser = async (username, password) => {
  try {
    const { data: auth } = await srfApi.post(
      `/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          origin: "http://srf.flem.org.br",
        },
      }
    );
    return auth;
  } catch (err) {
    console.log(err.message);
  }
};
