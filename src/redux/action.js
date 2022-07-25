import axios from "axios";
import * as types from './actionType';

export const getProducts = (products) => ({
    type: types.GET_PRODUCTS,
    payload: products,
})

export const getProduct = (product) => ({
    type: types.GET_SINGLE_PRODUCT,
    payload: product,
})

export const cartHandler = (productData) => {
    return {
        type: types.ADD_PRODUCT,
        payload: productData,
    }
}

export const removeCartData = (id) => {
    return {
        type: types.REMOVE_CART_DATA,
        payload: id,
    }
}

export const increment = (id) => {
    return {
        type: types.INCREMENT,
        payload: id,
    }
}

export const decrement = (id) => {
    return {
        type: types.DECREMENT,
        payload: id,
    }
}

export const loadProducts = () => {
    return function(dispatch) {
        axios.get("https://fakestoreapi.com/products?sort=desc").then((res) => {
            // console.log("Data", res);
            dispatch(getProducts(res.data));
        })
        .catch((error) => console.log(error));
    };
};

export const loadOneProduct = (id) => {
    return function(dispatch) {
        axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
            // console.log("Single Data" , res.data);
            dispatch(getProduct(res.data));
        })
        .catch((error) => console.log(error));
    };
};

export const getCartData = (productData) => {
    return function(dispatch) {
        dispatch(cartHandler(productData));
    }
}