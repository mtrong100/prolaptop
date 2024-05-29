import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
  selectAll,
  selectCouponCode,
  selectShippingMethod,
  selectedProduct,
} from "../redux/slices/cartSlice";
import Empty from "../components/Empty";
import { SHIPPING_METHOD } from "../utils/constants";
import useGetCouponCodes from "../hooks/useGetCouponCodes";
import { formatCurrencyVND } from "../utils/helper";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { couponCodes } = useGetCouponCodes();
  const { shippingMethod, cart, couponCodeUsed } = useSelector(
    (state) => state.cart
  );

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

  const handleCouponChange = (event) => {
    const selectedCoupon = couponCodes.find(
      (coupon) => coupon.name === event.target.value
    );
    if (selectedCoupon) {
      dispatch(
        selectCouponCode({
          name: selectedCoupon.name,
          discount: Number(selectedCoupon.discount),
        })
      );
    }
  };

  // FIX SCROLL BUG
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div>
      {cart.length === 0 ? (
        <Empty
          link="/product"
          buttonText="Tiếp tục mua hàng"
          firstCaption="Giỏ hàng của bạn hiện đang trống."
          secondCaption="Hãy thêm 1 sản phẩm
       bất kì trong cửa hàng của chúng tôi vào giỏ hàng của bạn"
        />
      ) : (
        <div className="my-10 grid grid-cols-[minmax(0,_1fr)_300px] gap-5 items-start">
          <CartTable cart={cart} />

          {/* BILL */}
          <div className="border-2 bg-gray-100 p-5">
            <Typography
              variant="lead"
              color="blue-gray"
              className="font-normal"
            >
              Hóa đơn thanh toán
            </Typography>

            <hr className="my-2 border-gray-500" />

            <div className="flex items-center justify-between mt-5 mb-3">
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Tạm tính:
              </Typography>

              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-semibold"
              >
                {formatCurrencyVND(subTotal)}
              </Typography>
            </div>

            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-normal"
              >
                Phí ship:
              </Typography>

              <ul className="space-y-1 mt-2">
                {SHIPPING_METHOD.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          color="red"
                          checked={item.name === shippingMethod?.name}
                          onChange={() =>
                            dispatch(
                              selectShippingMethod({
                                name: item.name,
                                price: Number(item.price),
                              })
                            )
                          }
                          className="rounded-full"
                        />
                        <p className="text-sm">{item.name}:</p>
                      </div>

                      <p>{formatCurrencyVND(item.price)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <hr className="my-2 border-gray-500" />

            <div className="my-5">
              <label
                htmlFor="couponCode"
                className="block mb-3 font-medium text-gray-700 "
              >
                Chọn mã giảm giá
              </label>
              <select
                id="couponCode"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-500 border focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md uppercase font-semibold"
                onChange={handleCouponChange}
              >
                <option value="" className="uppercase font-semibold">
                  Select a coupon
                </option>
                {couponCodes?.map((item) => (
                  <option
                    key={item?.name}
                    value={item?.name}
                    className="uppercase font-semibold"
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <hr className="my-2 border-gray-500" />

            <div className="flex items-center justify-between my-5 ">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal"
              >
                Tổng:
              </Typography>

              <Typography variant="h4" color="red" className="font-bold">
                {formatCurrencyVND(total)}
              </Typography>
            </div>

            <Button
              onClick={() => navigate("/checkout")}
              variant="gradient"
              color="red"
              className="flex rounded-none items-center gap-2 w-full justify-center"
            >
              <IoMdCheckmarkCircleOutline size={20} />
              Thanh toán đơn hàng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

function CartTable({ cart = [] }) {
  const dispatch = useDispatch();
  const { allSelected } = useSelector((state) => state.cart);

  return (
    <Card className="h-fit w-full ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th
              className={`border-b border-blue-gray-100 text-center bg-blue-gray-50`}
            >
              <Checkbox
                checked={allSelected}
                color="red"
                onChange={() => dispatch(selectAll())}
              />
            </th>
            <th
              className={`border-b border-blue-gray-100 bg-blue-gray-50 w-[300px]`}
            >
              Sản phẩm
            </th>
            <th className={`border-b border-blue-gray-100 bg-blue-gray-50`}>
              Số lượng
            </th>
            <th className={`border-b border-blue-gray-100 bg-blue-gray-50`}>
              Giá tiền
            </th>
            <th className={`border-b border-blue-gray-100 bg-blue-gray-50`}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 &&
            cart.map((item) => {
              return (
                <tr key={item.id} className="even:bg-blue-gray-50/50">
                  <td className="p-4 text-center">
                    <Checkbox
                      color="red"
                      checked={item.selected}
                      onChange={() => dispatch(selectedProduct(item))}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-5 ">
                      <div className="aspect-square w-[60px] h-[60px] flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h1 className="text-sm line-clamp-3">{item.name}</h1>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="border border-gray-400 w-fit rounded-full h-[48px] flex items-center ">
                      <button
                        className="text-3xl font-semibold w-[45px] h-[48px]"
                        onClick={() =>
                          dispatch(decreaseProductQuantity(item.id))
                        }
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg">{item.quantity}</span>
                      <button
                        className="text-3xl font-semibold w-[45px] h-[48px]"
                        onClick={() =>
                          dispatch(increaseProductQuantity(item.id))
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography variant="h5" color="red" className="font-bold">
                      {formatCurrencyVND(item.price * item.quantity)}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton
                      color="red"
                      size="md"
                      variant="text"
                      onClick={() => dispatch(removeProductFromCart(item.id))}
                      className="rounded-full "
                    >
                      <IoMdClose size={22} />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Card>
  );
}
