import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, type } = req.body

  if (!name || !email || !password || !type) {
    res.status(400).json({ message: 'All fields are required' })
  }

  if (!['admin', 'user'].includes(type.toLowerCase())) {
    res.status(400).json({ message: 'Invalid user type' })
  }
  if (password.length < 6) {
    res
      .status(400)
      .json({ message: 'Password lentgh should be greater than 6' })
  }

  userExists = await User.findOne({ email })
  if (userExists) {
    // bad request
    return res.status(400).json({ message: 'User  exists' })
  }
  const user = await User.create({
    name,
    email,
    password,
    type,
  })
  if (user) {
    const { _id, name, email, role } = user

    // 201 Created
    res.status(201).json({
      _id,
      name,
      email,
      role,
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
})
