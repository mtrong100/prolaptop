import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "brand",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          productCount: { $size: "$products" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json(brands);
  } catch (error) {
    console.log("Error in getBrands controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createBrand = async (req, res) => {
  const userRole = req.user.role;
  const { name } = req.body;

  try {
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const isExisted = await Brand.findOne({ name });

    if (isExisted) {
      return res.status(400).json({ message: "Thương hiệu đã tồn tại" });
    }

    const newBrand = new Brand({ name });
    await newBrand.save();

    return res.status(201).json(newBrand);
  } catch (error) {
    console.log("Error in createBrand controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBrand = async (req, res) => {
  const userRole = req.user.role;
  const { name } = req.body;
  const { id } = req.params;

  try {
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, { name });

    if (!updatedBrand) {
      return res.status(404).json({ error: "Không tìm thấy thương hiệu" });
    }

    return res.status(200).json(updatedBrand);
  } catch (error) {
    console.log("Error in updateBrand controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBrand = async (req, res) => {
  const userRole = req.user.role;
  const { id } = req.params;

  try {
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    // Check if there are products in the brand
    const productCount = await Product.countDocuments({ brand: id });

    if (productCount > 0) {
      return res
        .status(400)
        .json({ error: "Không thể xóa thương hiệu đã có sản phẩm" });
    }

    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: "Không tìm thấy thương hiệu" });
    }

    return res.status(200).json({ message: "Xóa thương hiệu hoàn tất" });
  } catch (error) {
    console.log("Error in deleteBrand controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
