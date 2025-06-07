// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const API_URL = 'http://localhost:5400/api'; // Updated to match your backend port

// Action Creators
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: error.message
    });
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    
    dispatch({
      type: ADD_PRODUCT,
      payload: data
    });
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data
    });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
