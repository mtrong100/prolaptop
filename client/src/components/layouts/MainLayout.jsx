import React, { useEffect } from "react";
import Header from "../shared/Header";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Scrolltop from "../Scrolltop";
import { useDispatch, useSelector } from "react-redux";
import Newsletter from "../Newsletter";
import { getUserDetailApi } from "../../api/userApi";
import useLogout from "../../hooks/useLogout";
import { storeCurrentUser } from "../../redux/slices/userSlice";
import Chatbox from "../Chatbox";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log("🚀 ~ MainLayout ~ currentUser:", currentUser?._id);
  const { handleLogout } = useLogout();

  useEffect(() => {
    async function fechUser() {
      try {
        const res = await getUserDetailApi(currentUser?._id);
        dispatch(storeCurrentUser(res));
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    }

    if (currentUser) {
      fechUser();
    }
  }, []);

  if (currentUser?.blocked) {
    handleLogout();
  }

  return (
    <>
      <Header />
      <section className="page-container">
        <Outlet />
      </section>
      {currentUser?.role === "user" && <Chatbox />}
      <Scrolltop />
      <Newsletter />
      <Footer />
    </>
  );
};

export default MainLayout;
