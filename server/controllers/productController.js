import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

const PRODUCT_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  SORT: "name",
  ORDER: "desc",
  QUERY: "",
  CATEGORY: "",
  SIZE: "",
  COLOR: "",
  BRAND: "",
  MIN_PRICE: 0,
  MAX_PRICE: 1000,
};

export const getProductCollection = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log("Error in send getProductCollection controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    sort = "name",
    order = "desc",
    query,
    category,
    color,
    brand,
    minPrice,
    maxPrice,
    ram,
    cpu,
    hardDrive,
    graphicCard,
    screen,
  } = req.query;

  try {
    const filter = {};

    if (query) filter.name = new RegExp(query, "i");
    if (color) filter.color = color;
    if (ram) filter.ram = ram;
    if (cpu) filter.cpu = cpu;
    if (hardDrive) filter.hardDrive = hardDrive;
    if (graphicCard) filter.graphicCard = graphicCard;
    if (screen) filter.screen = screen;
    if (minPrice && maxPrice) {
      filter.discountPrice = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    }

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) filter.category = categoryDoc._id;
    }
    if (brand) {
      const brandDoc = await Brand.findOne({ name: brand });
      if (brandDoc) filter.brand = brandDoc._id;
    }

    const options = {
      page,
      limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
      populate: [
        { path: "category", select: "name" },
        { path: "brand", select: "name" },
      ],
    };

    const products = await Product.paginate(filter, options);

    if (!products.docs || products.docs.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProducts controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error in send getProductDetail controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const newProduct = new Product(req.body);

    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in send createProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error in send updateProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Delete product successfully" });
  } catch (error) {
    console.log("Error in send deleteProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const p = await Product.findById(id);

    if (!p) {
      return res.status(404).json({ message: "Product not found" });
    }

    p.view += 1;

    await p.save();

    return res.status(200).json({ message: "View count updated" });
  } catch (error) {
    console.log("Error in send viewProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const setProductFlashSale = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({ error: "Not have permission" });
    }

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.flashSale = !product.flashSale;

    await product.save();

    res.status(200).json({ message: "Product flash sale status updated" });
  } catch (error) {
    console.error("Error in setProductFlashSale controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFlashsale = async (req, res) => {
  try {
    const flashsaleProducts = await Product.find({ flashSale: true }).populate([
      { path: "category", select: "name" },
      { path: "brand", select: "name" },
    ]);

    return res.status(200).json(flashsaleProducts);
  } catch (error) {
    console.error("Error in getFlashsale controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
