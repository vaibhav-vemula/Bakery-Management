import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import productReducer from "./ducks/product";
import tableReducer from "./ducks/table";

const reducer = combineReducers({
  products: productReducer,
  tables: tableReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));
sagaMiddleware.run(watcherSaga);

export default store;
