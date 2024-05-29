import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    shippingMethod: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
    couponCodeUsed: {
      name: { type: String },
      discount: { type: Number },
    },
    paymentMethod: { type: String, required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, required: true, default: "Chờ xác nhận" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model("Order", orderSchema);

export default Order;
