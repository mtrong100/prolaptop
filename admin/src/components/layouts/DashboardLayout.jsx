import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { useSelector } from "react-redux";
import Scrolltop from "../Scrolltop";

const DashboardLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <section>
      <section className="relative flex items-start ">
        <Sidebar />
        <main className="p-4 w-full">
          <Outlet />
        </main>
        {/* <Scrolltop /> */}
      </section>
    </section>
  );
};

export default DashboardLayout;
