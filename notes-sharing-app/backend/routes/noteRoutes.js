import express from "express";
import multer from "multer";
import { createNote, getNotes, updateNote, deleteNote, shareNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js"; // your auth middleware

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", protect, getNotes);
router.post("/", protect, upload.single("file"), createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post("/share/:id", protect, shareNote);

export default router;
