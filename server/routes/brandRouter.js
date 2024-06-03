import express from "express";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/brands", getBrands);

router.post("/create", protectedRoute, createBrand);

router.put("/update/:id", protectedRoute, updateBrand);

router.delete("/delete/:id", protectedRoute, deleteBrand);

export default router;
