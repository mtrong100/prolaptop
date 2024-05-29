import express from "express";
import {
  createOrder,
  getOrders,
  getOrderDetail,
  getUserOrders,
  getOrderCollection,
  updateOrder,
  cancelOrder,
} from "../controllers/orderController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/orders", protectedRoute, getOrders);

router.get("/collection", protectedRoute, getOrderCollection);

router.get("/:id", protectedRoute, getOrderDetail);

router.get("/my-orders/:id", protectedRoute, getUserOrders);

router.post("/create", protectedRoute, createOrder);

router.put("/update/:id", protectedRoute, updateOrder);

router.put("/cancel/:id", protectedRoute, cancelOrder);

export default router;
