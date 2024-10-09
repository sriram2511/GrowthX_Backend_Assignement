import { registerUser } from '../controllers/userController.js'
import express from 'express'

const router = express.Router() // Add const or let before router

router.post('/register', registerUser)
router.get('/check', (req, res) => {
  res.send('checklingggg')
})
router.post('/check', (req, res) => {
  res.send('workinggggggg')
})

export default router
