import axios from "axios";
import * as qs from "querystring";

const type = process.env.NODE_ENV === "development" ? 0 : 1;
const URL = ["http://localhost:3000/api"][type];

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const get = async <T>(url: string, query?: object): Promise<T> => {
  return await new Promise<T>((resolve, reject) => {
    axios
      .get(URL + url + (query ? "?" + qs.stringify(query) : ""))
      .then(res => resolve(res.data as T))
      .catch(error => reject(error));
  });
};

export const post = async <T>(
  url: string,
  data: object,
  query?: object
): Promise<T> => {
  return await new Promise<T>((resolve, reject) => {
    axios
      .post(URL + url + (query ? "?" + qs.stringify(query) : ""), data)
      .then(res => resolve(res.data as T))
      .catch(error => reject(error));
  });
};
