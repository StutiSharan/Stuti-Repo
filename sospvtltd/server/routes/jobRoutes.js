import express from "express"

import {
getJobs,
getJobById,
createJob,
applyJob,
updateJob,
deleteJob
} from "../controllers/jobController.js"

const router = express.Router()

router.get("/",getJobs)
router.get("/:id",getJobById)

router.post("/create",createJob)

router.put("/update/:id",updateJob)

router.delete("/delete/:id",deleteJob)

router.post("/apply",applyJob)

export default router