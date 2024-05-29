import CouponCode from "../models/CouponCodeModel.js";

export const getCouponCodes = async (req, res) => {
  try {
    const data = await CouponCode.find({}).sort({ createdAt: -1 });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getCouponCodes controller: ", error);
  }
};

export const createCouponCode = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const { name, discount } = req.body;

    const isExisted = await CouponCode.findOne({ name });

    if (isExisted) {
      return res.status(400).json({ message: "Mã giảm giá đã tồn tại" });
    }

    const data = new CouponCode({ name, discount });
    await data.save();

    return res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createCouponCode controller: ", error);
  }
};

export const updateCouponCode = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const { id } = req.params;
    const { name, discount } = req.body;

    const data = await CouponCode.findByIdAndUpdate(id, { name, discount });

    if (!data) {
      return res.status(404).json({ error: "Không tìm thấy mã giảm giá" });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in updateCouponCode controller: ", error);
  }
};

export const deleteCouponCode = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const { id } = req.params;

    const data = await CouponCode.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ error: "Không tìm thấy mả giảm giá" });
    }

    return res.status(200).json({ message: "Xóa mả giảm giá hoàn tất" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in deleteCouponCode controller: ", error);
  }
};
