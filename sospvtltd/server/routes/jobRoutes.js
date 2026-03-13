import express from "express"

import {
getJobs,
getJobById,
createJob,
applyJob
} from "../controllers/jobController.js"

const router = express.Router()

router.get("/",getJobs)

router.get("/:id",getJobById)

router.post("/",createJob)

router.post("/apply",applyJob)

export default router