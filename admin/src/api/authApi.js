import axios from "axios";

export const loginApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
    req,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
