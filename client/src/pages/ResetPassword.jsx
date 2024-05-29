import React, { useEffect } from "react";
import Banner from "../assets/banners/banner.webp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/form/FieldInput";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "../validations/resetPasswordSchema";
import { resetPasswordApi, sendOtpApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await trigger("email");
      const email = getValues("email");
      if (!email) return;
      await sendOtpApi({ email });
      toast.success("Mã OTP đã được gửi qua email của bạn");
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    }
  };

  const handleResetPassword = async (values) => {
    try {
      const req = { ...values };
      await resetPasswordApi(req);
      toast.success("Đặt lại mật khẩu thành công");
      reset();
      navigate("/login");
    } catch (error) {
      toast.error("Lỗi");
      console.log("Lỗi: ", error);
    }
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="rounded-sm aspect-square">
          <img src={Banner} alt="banner" className="img-cover" />
        </div>

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-5"
        >
          <h1 className="text-4xl font-bold mb-10">Đặt lại mật khẩu</h1>

          <FieldInput
            labelText="Mật khẩu"
            register={register}
            name="password"
            type="password"
            errorMessage={errors?.password?.message}
          />
          <FieldInput
            labelText="Xác nhận mật khẩu"
            register={register}
            name="confirmPassword"
            type="password"
            errorMessage={errors?.confirmPassword?.message}
          />

          <div>
            <div className="flex items-center justify-between gap-1">
              <Input size="lg" {...register("email")} label="Email" />
              <Button
                size="lg"
                onClick={handleSendOtp}
                variant="filled"
                className="w-[150px]"
              >
                Gửi mã
              </Button>
            </div>
            {errors && (
              <p className="mt-1 text-red-500 font-medium text-sm">
                {errors.email?.message}
              </p>
            )}
          </div>

          <FieldInput
            labelText="Mã OTP"
            register={register}
            name="otp"
            errorMessage={errors?.otp?.message}
          />

          <Button
            disabled={isSubmitting}
            color="red"
            className="w-full"
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Đang chờ..." : "Xác nhận"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
