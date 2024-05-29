import axios from "axios";

export const getCategoriesApi = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/category/categories`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const addNewCategoryApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/category/add-new`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateCategoryApi = async (id, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/category/update/${id}`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteCategoryApi = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/category/delete/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
