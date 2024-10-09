import asyncHandler from 'express-async-handler'

export const userMiddleware = asyncHandler(async (req, res, next) => {
  //   console.log(req.user)

  if (req.user && req.user.role === 'user') {
    next()
  } else {
    res.status(403).json({ message: 'only user can upload assignments' })
  }
})
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  //   console.log(req.user)

  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'only admin can see assignments' })
  }
})
