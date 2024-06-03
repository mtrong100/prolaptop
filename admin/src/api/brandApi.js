import axios from "axios";

export const getBrandsApi = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/brand/brands`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const createBrandApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/brand/create`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateBrandApi = async (id, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/brand/update/${id}`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteBrandApi = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/brand/delete/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
