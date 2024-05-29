import { useState } from "react";
import { registerApi } from "../api/authApi";
import { toast } from "react-toastify";

export default function useRegisterUser() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      const { email, password, name, confirmPassword } = values;

      await registerApi({ email, password, name, confirmPassword });
      toast.success("Tạo tài khoản thành công, vui lòng xác minh email");
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
}
