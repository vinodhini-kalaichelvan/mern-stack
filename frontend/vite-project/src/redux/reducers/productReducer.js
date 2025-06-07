import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT,
  UPDATE_PRODUCT
} from '../actions/productActions';

const initialState = {
  products: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.id ? action.payload : product
        )
      };
    default:
      return state;
  }
};

export default productReducer; 