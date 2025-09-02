import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createNote, getNotes, updateNote, deleteNote, shareNote } from "../controllers/noteController.js";

const router = express.Router();
router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post("/:id/share", protect, shareNote);

export default router;
