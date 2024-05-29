import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const { email, password } = values;

      const res = await loginApi({ email, password });

      dispatch(storeCurrentUser(res));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log("Something wrong: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
