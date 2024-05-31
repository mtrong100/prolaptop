import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../validations/checkoutValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TitleSection from "../components/TitleSection";
import {
  Button,
  Checkbox,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import FieldInput from "../components/form/FieldInput";
import { formatCurrencyVND } from "../utils/helper";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { createOrderApi, vnPayPaymentApi } from "../api/orderApi";
import { toast } from "react-toastify";
import { filterCart } from "../redux/slices/cartSlice";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { shippingMethod, cart, couponCodeUsed } = useSelector(
    (state) => state.cart
  );

  const selectedProducts = cart.filter((item) => item.selected);
  const orders = selectedProducts.map(({ selected, ...rest }) => rest);

  useEffect(() => {
    if (currentUser) {
      reset({
        fullName: currentUser?.name,
        address: currentUser?.address,
        phone: currentUser?.phone,
        email: currentUser?.email,
      });
    }
  }, [currentUser, reset]);

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

  const handleCheckout = async (values) => {
    setLoading(true);

    const req = {
      orderItems: orders,
      shippingAddress: {
        ...values,
      },
      shippingMethod: {
        name: shippingMethod.name,
        price: shippingMethod.price,
      },
      couponCodeUsed: {
        name: couponCodeUsed.name,
        discount: couponCodeUsed.discount,
      },
      paymentMethod: "Thanh toán sau khi nhận hàng",
      totalCost: total,
      user: currentUser?._id,
    };

    try {
      await createOrderApi(req);
      toast.success("Đặt hàng thành công");
      dispatch(filterCart());
      navigate("/");
    } catch (error) {
      toast.error("Lỗi thanh toán");
      console.log("Lỗi thanh toán: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVNPayPayment = async () => {
    try {
      console.log("Calling vnPayPaymentApi...");
      await vnPayPaymentApi();
    } catch (error) {
      console.log("Error in handleVNPayPayment: ", error);
    }
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="mt-10 mb-20">
      <TitleSection>Chi tiết hóa đơn</TitleSection>

      <section className="grid grid-cols-2 items-start gap-5 mt-5">
        <form onSubmit={handleSubmit(handleCheckout)}>
          <div className="space-y-5">
            <FieldInput
              labelTitle="Họ tên"
              labelText="Họ tên"
              register={register}
              name="fullName"
              errorMessage={errors?.fullName?.message}
            />
            <FieldInput
              labelTitle="Email"
              labelText="Email"
              register={register}
              name="email"
              errorMessage={errors?.email?.message}
            />
            <FieldInput
              labelTitle="Địa chỉ"
              labelText="Địa chỉ"
              register={register}
              name="address"
              errorMessage={errors?.address?.message}
            />
            <FieldInput
              labelTitle="Số điện thoại"
              labelText="Số điện thoại"
              register={register}
              name="phone"
              errorMessage={errors?.phone?.message}
            />
          </div>

          <div className="space-y-3 mt-5">
            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Tiền ship:
              </Typography>

              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    color="red"
                    checked
                    className="rounded-full"
                    onChange={() => {}}
                  />
                  {shippingMethod.name}:
                </div>

                <p>{formatCurrencyVND(shippingMethod.price)}</p>
              </li>
            </div>

            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Mã giảm giá sử dụng
              </Typography>
              <div className="p-3 uppercase mt-2 border rounded-sm bg-red-50 text-red-600 font-bold opacity-60">
                {couponCodeUsed.name} - {couponCodeUsed.discount}%
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <Typography variant="h4" color="blue-gray" className="font-bold">
                Tổng tiền:
              </Typography>

              <Typography variant="h3" color="red" className="font-semibold">
                {formatCurrencyVND(total)}
              </Typography>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <Button
              type="submit"
              variant="gradient"
              color="red"
              disabled={loading}
              className="flex rounded-sm w-full items-center gap-3 justify-center"
            >
              {loading ? (
                <Spinner color="red" className="h-4 w-4" />
              ) : (
                <IoMdCheckmarkCircleOutline size={20} />
              )}
              {loading ? "Đang chờ..." : "Đặt hàng"}
            </Button>

            <Button
              type="button"
              variant="gradient"
              color="blue"
              className="flex rounded-sm w-full items-center gap-3 justify-center"
              onClick={handleVNPayPayment}
            >
              Thanh toán với VN PAY
            </Button>
          </div>
        </form>

        <div className="mt-5 w-full h-fit">
          <table className="w-full  min-w-max table-auto text-left">
            <thead>
              <tr>
                <th
                  className={`border-b border-blue-gray-100 p-4 bg-blue-gray-50`}
                >
                  Sản phẩm
                </th>
                <th
                  className={`border-b border-blue-gray-100 p-4 bg-blue-gray-50`}
                >
                  Giá tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.length > 0 &&
                selectedProducts.map((item) => (
                  <tr key={item.id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-5 ">
                        <div className="aspect-square w-[60px] h-[60px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="w-full max-w-md">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.name}
                            </Typography>
                          </div>

                          <Typography
                            variant="small"
                            color="red"
                            className="font-semibold"
                          >
                            Số lượng: x{item.quantity}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="paragraph"
                        color="red"
                        className="font-semibold"
                      >
                        {formatCurrencyVND(subTotal)}
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
