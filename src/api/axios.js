import axios from "axios";

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_DEV_OTTIFY_URL}:8080`,
});

export default instance;
