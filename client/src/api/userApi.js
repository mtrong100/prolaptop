import axios from "axios";

const USER_PARAMS = {
  PAGE: 1,
  LIMIT: 12,
  SORT: "name",
  ORDER: "desc",
  QUERY: "",
};

export const getUserDetailApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/user/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateUserApi = async (userId, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/user/update/${userId}`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getAllUserApi = async ({
  page = USER_PARAMS.PAGE,
  limit = USER_PARAMS.LIMIT,
  sort = USER_PARAMS.SORT,
  order = USER_PARAMS.ORDER,
  query = USER_PARAMS.QUERY,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/user/users`,
    {
      params: {
        page,
        limit,
        order,
        sort,
        query,
      },
      withCredentials: true,
    }
  );

  return res.data;
};
