import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductDetail,
  updateProduct,
  viewProduct,
  getProductCollection,
  setProductFlashSale,
  getFlashsale,
} from "../controllers/productController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/flashsale", getFlashsale);

router.get("/collection", protectedRoute, getProductCollection);

router.get("/:id", getProductDetail);

router.post("/view/:id", viewProduct);

router.post("/create", protectedRoute, createProduct);

router.put("/update/:id", protectedRoute, updateProduct);

router.put("/flashsale/:id", protectedRoute, setProductFlashSale);

router.delete("/delete/:id", protectedRoute, deleteProduct);

export default router;
