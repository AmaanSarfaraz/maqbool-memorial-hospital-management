import express from "express";
import { getAllMessages, messageSend, deleteMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/message/send", messageSend)
router.delete("/message/delete/:id", verifyJWT, deleteMessage)

export default router;