import express from "express";
import authRouter from "./authRouter.js";
import orderRouter from "./orderRouter.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import reviewRouter from "./reviewRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import messageRouter from "./messageRouter.js";
import conversationRouter from "./conversationRouter.js";
import categoryRouter from "./categoryRouter.js";
import couponCodeRouter from "./couponCodeRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/review", reviewRouter);
router.use("/wishlist", wishlistRouter);
router.use("/message", messageRouter);
router.use("/conversation", conversationRouter);
router.use("/category", categoryRouter);
router.use("/couponcode", couponCodeRouter);

export default router;
