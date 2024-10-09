import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = asyncHandler(async (req, res) => {
  const { name, userId, password } = req.body
  let role = req.body.role

  // Validate request body fields
  if (!name || !userId || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Ensure the role is in lowercase
  role = role.toLowerCase()

  // Check for valid role
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid user role' })
  }

  // Password length check
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password length should be greater than 6' })
  }

  // Check if the userId already exists
  const userExists = await User.findOne({ userId })
  if (userExists) {
    return res.status(400).json({ message: 'User ID already exists' }) // More specific error message
  }

  // Create a new user
  // Create a new user
  try {
    const user = await User.create({
      name,
      userId,
      password,
      role,
    })

    const { _id, name: userName } = user

    // Respond with created user data
    return res.status(201).json({
      _id,
      name: userName,
      userId,
      role,
    })
  } catch (error) {
    console.error(error) // Log the error for debugging
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }

    // Handle other possible errors
    return res.status(500).json({ message: 'Internal server error' })
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { userId, password } = req.body
  console.log(`printttt${req.body}`)

  if (!userId || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const userExists = await User.findOne({ userId })
  if (!userExists) {
    return res.status(404).json({ message: 'User not found, please sign up' })
  }

  const checkPassword = await bcrypt.compare(password, userExists.password)
  if (!checkPassword) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: userExists._id, userId: userExists.userId, role: userExists.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  res.set('Authorization', `Bearer ${token}`)
  // Respond with user data and token
  return res.status(200).json({
    _id: userExists._id,
    name: userExists.name,
    userId: userExists.userId,
    role: userExists.role,
    token,
  })
})

export const userDetails = asyncHandler(async (req, res) => {
  res.status(200).send(req.user)
})
