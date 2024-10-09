import express from 'express'
import { adminMiddleware } from '../middleware/authorizeMiddleware.js'
import { getAssignment } from '../controllers/adminController.js'
import { authenticateUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/assignments', authenticateUser, adminMiddleware, getAssignment)

export default router
