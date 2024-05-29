import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    originalPrice: { type: Number, default: 0, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true, min: 1 },
    operatingSystem: { type: String, required: true },
    ram: { type: String, required: true },
    screen: { type: String, required: true },
    cpu: { type: String, required: true },
    hardDrive: { type: String, required: true },
    graphicCard: { type: String, required: true },
    view: { type: Number, default: 0, min: 0 },
    flashSale: { type: Boolean, default: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);
export default Product;
