import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    shippingMethod: {
      name: null,
      price: null,
    },
    couponCodeUsed: {
      name: null,
      discount: null,
    },
    allSelected: false,
  },
  reducers: {
    selectShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    selectCouponCode: (state, action) => {
      state.couponCodeUsed = action.payload;
    },
    selectAll: (state) => {
      state.allSelected = !state.allSelected;

      state.cart = state.cart.map((product) => ({
        ...product,
        selected: state.allSelected,
      }));
    },
    selectedProduct: (state, action) => {
      const productItem = action.payload;

      state.cart = state.cart.map((product) => ({
        ...product,
        selected:
          product.id === productItem.id ? !product.selected : product.selected,
      }));
    },
    filterCart: (state) => {
      state.cart = state.cart.filter((item) => !item.selected);
    },
    addProductToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeProductFromCart: (state, action) => {
      const productId = action.payload;

      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    increaseProductQuantity: (state, action) => {
      const productId = action.payload;

      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseProductQuantity: (state, action) => {
      const productId = action.payload;

      const product = state.cart.find((item) => item.id === productId);
      if (product) {
        if (product.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== productId);
        } else {
          product.quantity -= 1;
        }
      }
    },
    resetCart: () => {
      return {
        cart: [],
        shippingMethod: {
          name: null,
          price: null,
        },
        couponCodeUsed: {
          name: null,
          discount: null,
        },
      };
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  resetCart,
  selectShippingMethod,
  selectCouponCode,
  selectedProduct,
  selectAll,
  filterCart,
} = cartSlice.actions;

export default cartSlice.reducer;
