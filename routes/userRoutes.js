import {
  loginUser,
  registerUser,
  userDetails,
} from '../controllers/userController.js'
import express from 'express'
import { authenticateUser } from '../middleware/authMiddleware.js'

const router = express.Router() // Add const or let before router

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/get', authenticateUser, (req, res) => {
  res.send(req.user)
})

router.get('/protected', authenticateUser, (req, res) => {
  res
    .status(200)
    .json({ message: 'You have accessed a protected route!', user: req.user })
})

export default router
