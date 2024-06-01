import { Spinner } from "@material-tailwind/react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import VerifyEmail from "../pages/VerifyEmail";

/* MAIN PAGES */
const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Product = lazy(() => import("../pages/Product"));
const Account = lazy(() => import("../pages/Account"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const About = lazy(() => import("../pages/About"));
const Order = lazy(() => import("../pages/Order"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const PaymentSucess = lazy(() => import("../pages/PaymentSucess"));

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/product", element: <Product /> },
  { path: "/account", element: <Account /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/order", element: <Order /> },
  { path: "/about", element: <About /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/payment-success", element: <PaymentSucess /> },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {mainRoutes.map((route) => (
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

      <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
  );
};

export default AppRouter;
