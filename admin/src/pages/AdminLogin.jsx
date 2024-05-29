import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/loginSchema";
import FieldInput from "../components/FieldInput";
import { Button } from "@material-tailwind/react";
import useLoginUser from "../hooks/useLoginUser";

const AdminLogin = () => {
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

  const { loading, handleLogin } = useLoginUser();

  return (
    <div className="bg-white shadow-xl rounded-sm p-5 max-w-lg w-full">
      <h1 className="font-bold text-4xl text-center">Admin ProLaptop</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-5">
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
        <Button
          disabled={loading}
          color="blue"
          className="w-full"
          size="lg"
          type="submit"
        >
          {loading ? "Loading..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
