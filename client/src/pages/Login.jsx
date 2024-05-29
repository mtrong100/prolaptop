import React, { useEffect } from "react";
import Banner from "../assets/banners/banner.webp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/form/FieldInput";
import { Button } from "@material-tailwind/react";
import GoogleLogin from "../components/GoogleLogin";
import { loginSchema } from "../validations/loginSchema";
import useLoginUser from "../hooks/useLoginUser";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const { handleLogin, loading } = useLoginUser();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="rounded-sm aspect-square">
          <img src={Banner} alt="banner" className="img-cover" />
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <h1 className="text-4xl font-bold mb-10">Đăng nhập</h1>

          <GoogleLogin />

          <hr className="my-2 border-blue-gray-200" />

          <FieldInput
            labelText="Email"
            register={register}
            name="email"
            errorMessage={errors?.email?.message}
          />
          <FieldInput
            labelText="Password"
            register={register}
            name="password"
            type="password"
            errorMessage={errors?.password?.message}
          />

          <div className="my-4 text-right text-sm">
            <Link
              className="hover:text-red-500 hover:underline"
              to="/reset-password"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            disabled={loading}
            color="red"
            className="w-full"
            size="lg"
            type="submit"
          >
            {loading ? "Đang chờ..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
