import jwt from 'jsonwebtoken'
import User from '../models/User.js'
export const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(id).select('-password')
    next()
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
