import { useDispatch } from "react-redux";
import { logOutApi } from "../api/authApi";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOutApi();
      dispatch(storeCurrentUser(null));
      window.location.reload();
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
}
