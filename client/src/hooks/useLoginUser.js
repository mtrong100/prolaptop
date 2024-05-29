import { useState } from "react";
import { loginApi } from "../api/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function useLoginUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const { email, password } = values;

      const res = await loginApi({ email, password });

      toast.success("Đăng nhập hoàn tất");
      dispatch(storeCurrentUser(res));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log("Lỗi: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
