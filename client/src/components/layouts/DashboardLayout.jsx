import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Scrolltop from "../Scrolltop";
import Sidebar from "../shared/Sidebar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <section className="relative flex items-start">
      <Sidebar />
      <main className="p-3 w-full">
        <Outlet />
      </main>
      <Scrolltop />
    </section>
  );
};

export default DashboardLayout;
