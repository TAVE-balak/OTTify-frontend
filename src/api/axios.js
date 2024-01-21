import axios from "axios";

const instance = axios.create({
  baseURL: "http://52.79.200.90:8080",
});

export default instance;
