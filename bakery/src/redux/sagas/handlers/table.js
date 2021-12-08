import { call, put } from "redux-saga/effects";
import { setTable } from "../../ducks/table";
import { requestGetTable } from "../requests/table";

export function* handleGetTable(action) {
  try {
    console.log('response.data')
    const response = yield call(requestGetTable, action.bakeryid);
    console.log(response.data)
    const { data } = response;
    yield put(setTable(data));
  } catch (error) {
    console.log(error);
  }
}
