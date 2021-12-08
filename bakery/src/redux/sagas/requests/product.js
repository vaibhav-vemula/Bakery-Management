import axios from "axios";

export function requestGetProducts() {
  return axios.request({
    method: "get",
    url: "http://localhost:9000/products"
  });
}