export const GET_TABLE = "GET_TABLE";
const SET_TABLE = "SET_TABLE";
const SET_CUSTOMER = "SET_CUSTOMER"
const SET_ORDERIDS = "SET_ORDERIDS"

export const getTable = () => ({
  type: GET_TABLE,
});

export const setTable = (table) => ({
  type: SET_TABLE,
  table,
});

export const setCustomer = (cust) => ({
  type: SET_CUSTOMER,
  cust,
});

export const setOrderIds = (oid) => ({
  type: SET_ORDERIDS,
  oid,
});

const initialState = {
  tables: undefined,
  bakeryid: 1,
  customerID:null,
  orderIDs:[]
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE: {
      const { table } = action;
      return { ...state, tables:table.api_data.tables };
    }
    case SET_CUSTOMER: {
      const { cust } = action;
      return { ...state, customerID:cust };
    }
    case SET_ORDERIDS: {
      const { oid } = action;
      var ord = [...state.orderIDs]
      ord.push(oid)
      return { ...state, orderIDs: ord };
    }

    default:
      return state;
  }
};

export default tableReducer;
