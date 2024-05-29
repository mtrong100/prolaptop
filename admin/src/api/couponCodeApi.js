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

export const createCouponCodeApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/couponcode/create`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateCouponCodeApi = async (id, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/couponcode/update/${id}`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteCouponCodeApi = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/couponcode/delete/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
