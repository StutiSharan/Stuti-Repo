import express from 'express'
import { upload } from '../middleware/uploadMiddleware.js'
const router = express.Router()
router.post('/', upload.single('image'), (req, res) => {
  res.json({ image: `/uploads/${req.file.filename}` })
})
export default router
