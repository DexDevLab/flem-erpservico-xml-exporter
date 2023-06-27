import axios from "axios";

const backendApi = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const bdDominioApi = axios.create({
  baseURL: `${process.env.NEXT_API_BD_DOMINIO}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { backendApi, bdDominioApi };
