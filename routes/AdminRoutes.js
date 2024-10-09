import express from 'express'
import { adminMiddleware } from '../middleware/authorizeMiddleware.js'
import {
  rejectAssignment,
  getAssignment,
  acceptAssignment,
} from '../controllers/adminController.js'
import { authenticateUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post(
  '/assignments/:id/reject',
  authenticateUser,
  adminMiddleware,
  rejectAssignment
)
router.post(
  '/assignments/:id/accept',
  authenticateUser,
  adminMiddleware,
  acceptAssignment
)
router.get('/assignments', authenticateUser, adminMiddleware, getAssignment)

export default router
