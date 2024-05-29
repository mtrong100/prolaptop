import axios from "axios";

const ORDER_QUERY = {
  PAGE: 1,
  LIMIT: 12,
  ORDER: "desc",
};

export const createOrderApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/order/create`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getOrderDetailApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/order/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getUserOrdersApi = async ({
  userId,
  page = ORDER_QUERY.PAGE,
  limit = ORDER_QUERY.LIMIT,
  order = ORDER_QUERY.ORDER,
  status,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/order/my-orders/${userId}`,
    {
      params: {
        page,
        limit,
        order,
        status,
      },
      withCredentials: true,
    }
  );

  return res.data;
};

export const getAllOrderApi = async ({
  page = ORDER_QUERY.PAGE,
  limit = ORDER_QUERY.LIMIT,
  order = ORDER_QUERY.ORDER,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/order/orders`,
    {
      params: {
        page,
        limit,
        order,
      },
      withCredentials: true,
    }
  );

  return res.data;
};

export const cancelOrderApi = async (id) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/order/cancel/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
};
