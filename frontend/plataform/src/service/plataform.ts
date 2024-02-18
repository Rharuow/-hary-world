import axios from "axios";

const plataformApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORTAL_URL + "/api/v1",
});

export { plataformApi };
