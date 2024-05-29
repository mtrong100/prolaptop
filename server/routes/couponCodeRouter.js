import express from "express";

import { protectedRoute } from "../middlewares/protectedRoute.js";
import {
  createCouponCode,
  deleteCouponCode,
  getCouponCodes,
  updateCouponCode,
} from "../controllers/couponCodeController.js";

const router = express.Router();

router.get("/couponcodes", getCouponCodes);

router.post("/create", protectedRoute, createCouponCode);

router.put("/update/:id", protectedRoute, updateCouponCode);

router.delete("/delete/:id", protectedRoute, deleteCouponCode);

export default router;
