import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoadingOrders: false,
    isCheckout: false,
    isPaying: false,
    query: "",
    sortOption: "desc",
    nextPage: 1,
    totalPages: 1,
    currentPage: 0,
  },
  reducers: {
    orderList: (state, action) => {
      state.orders = action.payload;
      state.isLoadingOrders = false;
    },
    loadingOrders: (state, action) => {
      state.isLoadingOrders = action.payload;
    },
    setIsCheckout: (state, action) => {
      state.isCheckout = action.payload;
    },
    setIsPaying: (state, action) => {
      state.isPaying = action.payload;
    },
    setQueryOrder: (state, action) => {
      state.query = action.payload;
    },
    setSortOptionVal: (state, action) => {
      state.sortOption = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
  },
});

export const {
  orderList,
  loadingOrders,
  setQueryOrder,
  setSortOptionVal,
  setTotalPages,
  setNextPage,
  setCurrentPage,
  setIsCheckout,
  setIsPaying,
} = orderSlice.actions;

export default orderSlice.reducer;
