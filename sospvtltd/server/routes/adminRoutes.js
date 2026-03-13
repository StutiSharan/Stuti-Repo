import express from "express"
import {adminLogin,createJob} from "../controllers/adminController.js"

const router = express.Router()

router.post("/login",adminLogin)

router.post("/job",createJob)

export default router
