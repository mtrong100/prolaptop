import express from "express";
import {
  getUsers,
  getUserDetail,
  updateUser,
  getUserCollection,
  blockUser,
  deleteUser,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsers);

router.get("/collection", protectedRoute, getUserCollection);

router.get("/:id", protectedRoute, getUserDetail);

router.put("/update/:id", protectedRoute, updateUser);

router.delete("/delete/:id", protectedRoute, deleteUser);

router.put("/block/:id", protectedRoute, blockUser);

export default router;
