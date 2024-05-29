import { useState } from "react";
import { updateUserApi } from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdateUser = async (values) => {
    try {
      const req = { ...values };

      const res = await updateUserApi(currentUser?._id, req);

      dispatch(storeCurrentUser(res));
      toast.success("Cập nhật thông tin hoàn tất");
    } catch (error) {
      toast.error(error.message);
      console.log("Lỗi: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, loading };
}
