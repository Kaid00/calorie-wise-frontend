import axios from "axios";
import { BASE_URL } from "@/constant";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

export default axiosConfig;
