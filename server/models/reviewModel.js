import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: { type: String, required: true },
    rate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

reviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
