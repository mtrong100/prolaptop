import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const CouponCodeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

CouponCodeSchema.plugin(mongoosePaginate);
const CouponCode = mongoose.model("CouponCode", CouponCodeSchema);
export default CouponCode;
