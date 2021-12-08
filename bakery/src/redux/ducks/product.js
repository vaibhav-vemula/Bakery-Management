export const GET_PRODUCTS = "GET_PRODUCTS";
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PREV_PRODUCTS = "SET_PREV_PRODUCTS";
const REMOVE_ALL = "REMOVE_ALL";

const INCREMENT = "increment";
const DECREMENT = "decrement";

export const increment = (da) => ({
  type: INCREMENT,
  da,
});

export const decrement = (da) => ({
  type: DECREMENT,
  da,
});

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const removeALL = () => ({
  type: REMOVE_ALL,
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const setPrevProducts = () => ({
  type: SET_PREV_PRODUCTS,
});

const initialState = {
  count: 0,
  items: undefined,
  addedItems: [],
  total: 0,
  prevItems:[],
  prevTotal:0
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      const { products } = action;
      return { ...state, items:products.api_data };
    }

    case SET_PREV_PRODUCTS: {
      var ord = [...state.prevItems]
     var tem =  JSON.parse(JSON.stringify(state.addedItems));
      ord.push(...tem)
      var ppp = parseInt(state.prevTotal)+parseInt(state.total)
      return { ...state, prevItems: ord, addedItems:[],count:0, total:0, prevTotal:ppp};
    }

    case REMOVE_ALL: {
      console.log('hello')
      return { ...state, prevItems: [],addedItems:[],count:0, total:0, prevTotal:0};
    }


    case INCREMENT: {
      let addedItem = state.items.find((item) => item.productID === action.da);
      let existed_item = state.addedItems.find((item) => action.da === item.productID);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: parseInt(state.total) + parseInt(addedItem.price),
          count: state.count + 1,
        };
      } else {
        addedItem.quantity = 1;
        let newTotal = parseInt(state.total) + parseInt(addedItem.price);
        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
          count: state.count + 1,
        };
      }
    }

    case DECREMENT: {
      let existed_item = state.addedItems.find((item) => action.da === item.productID);
      if (existed_item.quantity >= 2) {
        existed_item.quantity -= 1;
        return {
          ...state,
          total: parseInt(state.total) - parseInt(existed_item.price),
          count: state.count - 1,
        };
      } else if (existed_item.quantity < 2) {
        let new_items = state.addedItems.filter(
          (item) => action.da !== item.productID
        );
        let newTotal = parseInt(state.total) - parseInt(existed_item.price);
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
          count: state.count - 1,
        };
      }
      break;
    }

    default:
      return state;
  }
};

export default productReducer;
