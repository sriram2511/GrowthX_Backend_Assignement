import asyncHandler from 'express-async-handler'

export const userMiddleware = asyncHandler(async (req, res) => {
  if (req.user && req.user.role === 'user') {
    next()
  } else {
    res.status(403).json({ message: 'only user can upload assignments' })
  }
})
