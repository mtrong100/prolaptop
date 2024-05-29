import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model("Category", CategorySchema);
export default Category;
