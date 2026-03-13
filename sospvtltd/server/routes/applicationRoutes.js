import express from "express"
import {applyJob} from "../controllers/applicationController.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/apply",upload.single("resume"),applyJob)

export default router
