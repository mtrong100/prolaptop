import axios from "axios";

export const getUserWishlistApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/wishlist/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const toggleWishlistApi = async (userId, productId) => {
  const res = await axios.post(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/wishlist/toggle/${userId}/${productId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
};
