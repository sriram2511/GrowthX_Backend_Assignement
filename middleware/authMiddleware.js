// middleware/authMiddleware.js
import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Get token from Authorization header
  console.log(token)
  console.log(req.headers.authorization)

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Add user information to the request object
    req.user = decoded

    next() // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
}
