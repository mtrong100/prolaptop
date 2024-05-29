import Category from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getCategories controller: ", error);
  }
};

export const getCategoryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getCategories controller: ", error);
  }
};

export const addNewCategory = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const { name } = req.body;

    const isExisted = await Category.findOne({ name });

    if (isExisted) {
      return res.status(400).json({ message: "Danh mục đã tồn tại" });
    }

    const category = new Category({ name });
    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in addNewCategory controller: ", error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name });

    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in updateCategory controller: ", error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Không có ủy quyền" });
    }

    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    return res.status(200).json({ message: "Xóa danh mục hoàn tất" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in deleteCategory controller: ", error);
  }
};
