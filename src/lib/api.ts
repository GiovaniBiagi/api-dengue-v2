import axios from "axios";

const instance = axios.create({
  baseURL: process.env.DENGUE_API_URL,
});

export default instance;
