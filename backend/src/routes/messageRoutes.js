import express from "express";
import protect from "../middleware/authMiddleware.js";
import { sendMessage,getMessages } from "../controllers/messageController.js";

const router = express.Router();

// Endpoint to send a new message
router.post("/", protect, sendMessage);
router.get("/:chatId", protect, getMessages);
export default router;
