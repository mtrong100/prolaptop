import axios from "axios";

const REVIEW_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "desc",
};

export const getReviewsFromProductApi = async ({
  productId,
  page = REVIEW_QUERY.PAGE,
  limit = REVIEW_QUERY.LIMIT,
  order = REVIEW_QUERY.ORDER,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/review/${productId}`,
    {
      params: {
        page,
        limit,
        order,
      },
    }
  );

  return res.data;
};

export const createReviewApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/review/create`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateReviewApi = async (id, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/review/update/${id}`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const deleteReviewApi = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/review/delete/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
