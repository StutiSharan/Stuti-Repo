import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { getAllUsers, getAllNotes } from "../controllers/adminController.js";

const router = express.Router();
router.get("/users", protect, admin, getAllUsers);
router.get("/notes", protect, admin, getAllNotes);

export default router;
