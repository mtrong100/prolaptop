import { Spinner } from "@material-tailwind/react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const UpdateProduct = lazy(() => import("../pages/UpdateProduct"));
const ManageCategory = lazy(() => import("../pages/ManageCategory"));
const ManageCouponCode = lazy(() => import("../pages/ManageCouponCode"));
const ManageOrder = lazy(() => import("../pages/ManageOrder"));
const ManageProduct = lazy(() => import("../pages/ManageProduct"));
const ManageReview = lazy(() => import("../pages/ManageReview"));
const ManageUser = lazy(() => import("../pages/ManageUser"));
const Chat = lazy(() => import("../pages/Chat"));
const OrderDetail = lazy(() => import("../pages/OrderDetail"));
const Statistic = lazy(() => import("../pages/Statistic"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));

const adminRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/admin/manage-product", element: <ManageProduct /> },
  { path: "/admin/manage-order", element: <ManageOrder /> },
  { path: "/admin/manage-user", element: <ManageUser /> },
  { path: "/admin/manage-category", element: <ManageCategory /> },
  { path: "/admin/manage-couponcode", element: <ManageCouponCode /> },
  { path: "/admin/manage-review", element: <ManageReview /> },
  { path: "/admin/add-product", element: <AddProduct /> },
  { path: "/admin/update-product/:id", element: <UpdateProduct /> },
  { path: "/admin/chat", element: <Chat /> },
  { path: "/admin/view-order/:id", element: <OrderDetail /> },
  { path: "/admin/statistic", element: <Statistic /> },
  { path: "/admin/view-product/:id", element: <ProductDetail /> },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/admin/login"
          element={
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <Spinner className="h-24 w-24" />
                </div>
              }
            >
              <AdminLogin />
            </Suspense>
          }
        />
      </Route>

      <Route element={<DashboardLayout />}>
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <Spinner className="h-24 w-24" />
                  </div>
                }
              >
                {route.element}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
