import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistApi, toggleWishlistApi } from "../api/wishlistApi";
import {
  setIsInWishlist,
  setUserWishlist,
} from "../redux/slices/wishlistSlice";
import { toast } from "react-toastify";

export default function useFavorite() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { userWishlist, isLoadingWishlist } = useSelector(
    (state) => state.wishlist
  );

  const handleToggleFavorite = async (productId) => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    try {
      const res = await toggleWishlistApi(currentUser?._id, productId);
      const data = await getUserWishlistApi(currentUser?._id);
      dispatch(setUserWishlist(data));
      dispatch(setIsInWishlist((prevState) => !prevState));
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log("Lỗi: ", error);
    }
  };

  return {
    handleToggleFavorite,
    userWishlist,
    isLoadingWishlist,
  };
}
