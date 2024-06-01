import express from "express";
import {
  createOrder,
  getOrders,
  getOrderDetail,
  getUserOrders,
  getOrderCollection,
  updateOrder,
  cancelOrder,
  stripeCheckout,
  checkoutSession,
  deleteOrder,
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

router.post("/stripe-checkout", protectedRoute, stripeCheckout);

router.get("/checkout-session/:sessionId", protectedRoute, checkoutSession);

router.delete("/delete/:id", protectedRoute, deleteOrder);

export default router;
