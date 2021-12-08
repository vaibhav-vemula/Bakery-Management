import { takeLatest } from "redux-saga/effects";
import { handleGetProducts } from "./handlers/product";
import { GET_PRODUCTS } from "../ducks/product";
import { GET_TABLE } from "../ducks/table";
import { handleGetTable } from "./handlers/table";

export function* watcherSaga() {
  yield takeLatest(GET_PRODUCTS, handleGetProducts);
  yield takeLatest(GET_TABLE, handleGetTable);
}
