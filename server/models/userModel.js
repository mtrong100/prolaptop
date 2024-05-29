import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String, default: null },
    phone: { type: String, default: null },
    provider: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    verified: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
export default User;
