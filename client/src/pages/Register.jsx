import React from "react";
import Banner from "../assets/banners/banner.webp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validations/registerSchema";
import useRegisterUser from "../hooks/useRegisterUser";
import FieldInput from "../components/form/FieldInput";
import { Button } from "@material-tailwind/react";
import GoogleLogin from "../components/GoogleLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleRegister, loading } = useRegisterUser();

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="rounded-sm aspect-square">
          <img src={Banner} alt="banner" className="img-cover" />
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          <h1 className="text-4xl font-bold mb-10">Tạo tài khoản</h1>

          <GoogleLogin />

          <hr className="my-2 border-blue-gray-200" />

          <FieldInput
            labelText="Tên"
            register={register}
            name="name"
            errorMessage={errors?.name?.message}
          />
          <FieldInput
            labelText="Email"
            register={register}
            name="email"
            errorMessage={errors?.email?.message}
          />
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

          <Button
            disabled={loading}
            color="red"
            className="w-full"
            size="lg"
            type="submit"
          >
            {loading ? "Đang chờ..." : "Đăng kí tài khoản"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
