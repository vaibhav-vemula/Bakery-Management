import axios from "axios";

export function requestGetTable(bakeryid) {
  console.log("bakeryid")
  console.log(bakeryid)
  return axios.request({
    method: "get",
    url: `http://localhost:9000/tables?bakeryid=1`
  });
}
