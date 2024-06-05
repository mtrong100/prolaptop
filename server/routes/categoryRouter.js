import express from "express";
import {
  addNewCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/categories", getCategories);

router.post("/add-new", protectedRoute, addNewCategory);

router.put("/update/:id", protectedRoute, updateCategory);

router.delete("/delete/:id", protectedRoute, deleteCategory);

export default router;
