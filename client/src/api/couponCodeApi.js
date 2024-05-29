import axios from "axios";

export const getCouponCodeApi = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/couponcode/couponcodes`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};
