import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

BrandSchema.plugin(mongoosePaginate);
const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;
