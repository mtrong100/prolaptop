import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  autoGeneratePassword,
  generateTokenAndSetCookie,
} from "../utils/helper.js";
import {
  sendConfirmationEmail,
  sendOtpResetPassword,
} from "../services/emailService.js";
import { AUTH_PROVIDER } from "../utils/constants.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { email, password, name, confirmPassword } = req.body;

    // Kiểm tra người dùng và mật khẩu
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Tài khoản đã tồn tại" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
    }

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Tạo token email
    const token = crypto.randomBytes(20).toString("hex");

    // Tạo model
    const newUser = new User({
      name,
      email,
      provider: AUTH_PROVIDER.emailAndPassword,
      password: hash,
      verificationToken: token,
    });
    await newUser.save();

    // Tạo token và set cookie cho trình duyệt
    generateTokenAndSetCookie(newUser._id, res);

    // Gửi email xác minh danh tính
    sendConfirmationEmail(email, token);

    return res.status(201).json({
      message: "Tạo tài khoản thành công. Vui lòng xác minh email",
    });
  } catch (error) {
    console.log("Lỗi", error.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra người dùng
    const user = await User.findOne({ email });

    if (user.blocked) {
      return res.status(400).json({ error: "Tài khoản của bạn đã bị khóa" });
    }

    if (!user) {
      return res.status(400).json({ error: "Không tìm thấy tài khoản" });
    }

    if (!user.verified) {
      return res.status(400).json({ error: "Tài khoản chưa dược xác minh" });
    }

    // Kiểm tra mật khẩu
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    // Tạo token và set cookie cho trình duyệt
    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      verified: user.verified,
      provider: user.provider,
      phone: user.phone,
      address: user.address,
      blocked: user.blocked,
    });
  } catch (error) {
    console.log("Lỗi", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    // Kiểm tra người dùng
    const user = await User.findOne({ email });

    if (!user) {
      // Tự động tạo mật khẩu khi đăng nhập bằng google
      const generatedPassword = autoGeneratePassword();

      // Mã hóa mật khẩu
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(generatedPassword, salt);

      // Tạo model
      const newUser = new User({
        name,
        email,
        avatar,
        provider: AUTH_PROVIDER.google,
        password: hash,
        verified: true,
      });
      await newUser.save();

      // Tạo token và set cookie cho trình duyệt
      generateTokenAndSetCookie(newUser._id, res);

      return res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
        role: newUser.role,
        verified: newUser.verified,
        provider: newUser.provider,
        phone: newUser.phone,
        address: newUser.address,
        blocked: newUser.blocked,
      });
    }

    if (user.blocked) {
      return res.status(400).json({ error: "Tài khoản của bạn đã bị khóa" });
    }

    // Tạo token và set cookie cho trình duyệt
    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      verified: user.verified,
      provider: user.provider,
      phone: user.phone,
      address: user.address,
      blocked: user.blocked,
    });
  } catch (error) {
    console.log("Lỗi", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Đã đăng xuất tài khoản" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword, otp } = req.body;

    // Kiểm tra người dùng
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    // Kiểm tra thời hạn của mã OTP
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "Mã OTP đã hết hạn" });
    }

    // Kiểm tra mã OTP trùng khớp hay không?
    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({ error: "Mã OTP không hợp lệ" });
    }

    // Kiểm tra mật khẩu có trùng khớp hay không?
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
    }

    // Cập nhật lại mật khẩu và clear thời hạn của mã OTP
    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu hoàn tất" });
  } catch (error) {
    console.log("Error in reset password controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Kiểm tra người dùng
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    // Tạo mã OTP và thời gian hết hạn mã
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set mã OTP và thời gian hết hạn mã
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    // Gửi mã OTP qua <email></email>
    await sendOtpResetPassword(email, otp);

    return res
      .status(200)
      .json({ message: "Mã OTP đã được gửi tới email của bạn" });
  } catch (error) {
    console.log("Error in send OTP controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      res.status(400).json({ error: "Sai token" });
    }

    user.verified = true;

    const newUser = await user.save();

    const { verified } = newUser._doc;

    return res.status(200).json({ message: "Xác minh hoàn tất", verified });
  } catch (error) {
    console.log("Error in send verify email controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};
