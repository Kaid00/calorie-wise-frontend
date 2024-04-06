import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL;
const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

export default axiosConfig;
