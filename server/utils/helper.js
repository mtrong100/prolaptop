import jwt from "jsonwebtoken";

export const autoGeneratePassword = () => {
  const generatedPassword =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

  return generatedPassword;
};

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

export const formatCurrencyVND = (amount) => {
  if (typeof amount !== "number") {
    return "Input must be a number";
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};
