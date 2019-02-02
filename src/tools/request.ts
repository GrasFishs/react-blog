import { message } from "./../components/Message/index";
import axios from "axios";
import * as qs from "querystring";

const type = process.env.NODE_ENV === "development" ? 0 : 1;
const URL = ["http://localhost:8080/api"][type];

const throwError = (duration: number = 3000) =>
  message.danger("网络连接不可用，请稍后重试", duration);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.message === "Network Error") {
      throwError();
    } else {
      throw err;
    }
  }
);

export const get = async <T>(url: string, query?: object): Promise<T> => {
  return await new Promise<T>((resolve, reject) => {
    axios
      .get(URL + url + (query ? "?" + qs.stringify(query) : ""))
      .then(res => {
        if (res) {
          resolve(res.data as T);
        } else {
          throwError();
        }
      })
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
      .then(res => {
        if (res) {
          resolve(res.data as T);
        } else {
          throwError();
        }
      })
      .catch(error => reject(error));
  });
};
