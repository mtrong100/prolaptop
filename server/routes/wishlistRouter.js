import express from "express";
import {
  getUserWishlist,
  toggleWishlist,
} from "../controllers/wishlistController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/:userId", protectedRoute, getUserWishlist);
router.post("/toggle/:userId/:productId", protectedRoute, toggleWishlist);

export default router;
