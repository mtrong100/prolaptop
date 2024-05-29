import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema } from "../validations/accountSchema";
import useUpdateUser from "../hooks/useUpdateUser";
import { useSelector } from "react-redux";
import FieldInput from "../components/form/FieldInput";
import TitleSection from "../components/TitleSection";
import {
  Button,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { PROFILE_SIDEBAR } from "../utils/constants";
import { LiaSignOutAltSolid } from "react-icons/lia";
import useLogout from "../hooks/useLogout";

const Account = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(accountSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const { currentUser } = useSelector((state) => state.user);
  const { handleUpdateUser, loading } = useUpdateUser();

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser?.name,
        email: currentUser?.email,
        address: currentUser?.address,
        phone: currentUser?.phone,
      });
    }
  }, [currentUser, reset]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="my-10">
      <TitleSection>Tài khoản của tôi</TitleSection>

      <div className="my-5 grid grid-cols-[300px_minmax(0,_1fr)] items-start gap-5">
        <DefaultSidebar />
        <main>
          <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className="space-y-5 w-full max-w-xl mx-auto"
          >
            <div className="w-[150px] h-[150px] mx-auto">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="img-cover rounded-lg"
              />
            </div>

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
              labelText="Địa chỉ"
              register={register}
              name="address"
              errorMessage={errors?.address?.message}
            />
            <FieldInput
              labelText="Số điện thoại"
              register={register}
              name="phone"
              errorMessage={errors?.phone?.message}
            />

            <Button
              disabled={loading}
              color="red"
              className="w-full"
              size="lg"
              type="submit"
              variant="gradient"
            >
              {loading ? "Đang chờ..." : "Cập nhật"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Account;

function DefaultSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const { handleLogout } = useLogout();

  return (
    <div className="w-full p-4 shadow-xl shadow-blue-gray-900/5 border">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-[40px] h-[40px] object-cover rounded-full flex-shrink-0"
          />
          <div>
            <span className="text-green-500 font-medium">
              {currentUser?.verified ? "Đã xác minh" : "Chưa xác minh"}
            </span>
            <h2 className="font-semibold">{currentUser?.name}</h2>
          </div>
        </div>
      </div>
      <List>
        {PROFILE_SIDEBAR.map((item) => {
          return (
            <Link to={item.link} key={item.name}>
              <ListItem>
                <ListItemPrefix>{item.icon}</ListItemPrefix>
                {item.name}
              </ListItem>
            </Link>
          );
        })}

        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <LiaSignOutAltSolid size={20} />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </div>
  );
}
