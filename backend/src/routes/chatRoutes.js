import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createOrGetChat,getChats } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", protect, createOrGetChat);
router.get("/", protect, getChats);
export default router;
