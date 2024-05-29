import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingWishlist,
  setUserWishlist,
} from "../redux/slices/wishlistSlice";
import { getUserWishlistApi } from "../api/wishlistApi";

export default function useWishlist() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { userWishlist, isLoadingWishlist } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    async function fetchUserWishlist() {
      dispatch(setLoadingWishlist(true));

      try {
        const res = await getUserWishlistApi(currentUser?._id);
        dispatch(setUserWishlist(res));
      } catch (error) {
        console.log("Lỗi fetch data sản phẩm yêu thích: ", error);
        setUserWishlist([]);
      } finally {
        dispatch(setLoadingWishlist(false));
      }
    }

    if (currentUser) {
      fetchUserWishlist();
    }
  }, [currentUser?._id, dispatch]);

  return { userWishlist, isLoadingWishlist };
}
