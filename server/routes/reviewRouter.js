import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsFromProduct,
  updateReview,
} from "../controllers/reviewController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/reviews", protectedRoute, getAllReviews);

router.get("/:productId", getReviewsFromProduct);

router.post("/create", protectedRoute, createReview);

router.put("/update/:id", protectedRoute, updateReview);

router.delete("/delete/:id", protectedRoute, deleteReview);

export default router;
