import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Assignment from '../models/assignmentModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAssignment = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find()
  res.status(200).send(assignments)
})
