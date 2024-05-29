import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal, resetCart } from "../redux/slices/cartSlice";
import { PAYMENT_METHOD } from "../utils/constants";
import { createOrderApi } from "../api/orderApi";
import toast from "react-hot-toast";
import { setIsCheckout } from "../redux/slices/orderSlice";

export default function useCheckout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const total = useSelector(calculateTotal);
  const { shippingMethod, cart, couponCode } = useSelector(
    (state) => state.cart
  );
  const { isCheckout } = useSelector((state) => state.order);

  const handleCheckout = async (values) => {
    dispatch(setIsCheckout(true));

    try {
      const req = {
        shippingAddress: {
          ...values,
        },
        orderItems: cart,
        shippingType: {
          type: shippingMethod.name,
          price: shippingMethod.price,
        },
        details: {
          paymentMethod: PAYMENT_METHOD.CASH,
          totalCost: total.toFixed(2),
          couponCodeApply: couponCode,
        },
        user: currentUser?._id,
      };

      await createOrderApi(req);
      toast.success("Place an order successfully");
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log("Failed to handleCheckout: ", error);
    } finally {
      dispatch(setIsCheckout(false));
    }
  };

  return { handleCheckout, isCheckout };
}
