import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrderApi, getCheckoutSessionApi } from "../api/orderApi";
import Image from "../assets/images/payment.png";
import { useDispatch, useSelector } from "react-redux";
import { filterCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sessionData, setSessionData] = useState(null);
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const { shippingMethod, cart, couponCodeUsed } = useSelector(
    (state) => state.cart
  );
  const { currentUser } = useSelector((state) => state.user);
  const selectedProducts = cart.filter((item) => item.selected);
  const orders = selectedProducts.map(({ selected, ...rest }) => rest);

  const subTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      if (item.selected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  }, [cart]);

  const total = useMemo(() => {
    return (
      subTotal +
      (shippingMethod?.price || 0) -
      (couponCodeUsed?.discount
        ? (subTotal * couponCodeUsed.discount) / 100
        : 0)
    );
  }, [subTotal, shippingMethod, couponCodeUsed]);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const data = await getCheckoutSessionApi(sessionId);
        setSessionData(data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  useEffect(() => {
    async function handlePaymentSuccess() {
      try {
        const body = {
          orderItems: orders,
          shippingAddress: {
            fullName: sessionData?.session?.customer_details?.name,
            address: sessionData?.session?.customer_details?.address?.line1,
            phone: sessionData?.session?.customer_details?.phone,
            email: sessionData?.session?.customer_details?.email,
          },
          shippingMethod: {
            name: shippingMethod.name,
            price: shippingMethod.price,
          },
          couponCodeUsed: {
            name: couponCodeUsed.name,
            discount: couponCodeUsed.discount,
          },
          paymentMethod: "Thanh toán chuyển khoản",
          totalCost: total,
          user: currentUser?._id,
        };
        await createOrderApi(body);
        dispatch(filterCart());
        toast.success("Thanh toán thành công");
        setSessionData(null);
      } catch (error) {
        console.log("Lỗi thanh toán: ", error);
      }
    }

    if (sessionData) {
      handlePaymentSuccess();
      navigate("/payment-success", { replace: true });
    }
  }, [sessionData]);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className=" rounded-lg  p-8 max-w-xl w-full ">
        <h2 className="text-4xl text-center font-bold text-green-500">
          Thanh toán thành công
        </h2>

        {sessionData && (
          <div className="flex flex-col items-center justify-center mt-2">
            <p className="text-lg text-gray-800">
              Cảm ơn bạn vì đã mua sản phẩm của chúng tôi!
            </p>
          </div>
        )}

        <Button
          onClick={() => navigate("/")}
          className="flex items-center justify-center mx-auto mt-5"
          variant="gradient"
          color="red"
          size="lg"
        >
          Quay về trang chủ
        </Button>

        <div>
          <img src={Image} alt="banner" className="img-cover rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
