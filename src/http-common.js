import axios from "axios";

const http = axios.create({
  baseURL: "https://spc-mg-a5186dac44fd.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
