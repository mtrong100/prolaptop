import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    userWishlist: [],
    isLoadingWishlist: false,
    isInWishlist: false,
    limit: 4,
  },
  reducers: {
    setUserWishlist: (state, action) => {
      state.userWishlist = action.payload;
      state.isLoadingWishlist = false;
    },
    setLoadingWishlist: (state, action) => {
      state.isLoadingWishlist = action.payload;
    },
    setIsInWishlist: (state, action) => {
      state.isInWishlist = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    increaseLimit: (state) => {
      state.limit += 4;
    },
  },
});

export const {
  setUserWishlist,
  setLoadingWishlist,
  setIsInWishlist,
  setLimit,
  increaseLimit,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
