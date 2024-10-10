import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Assignment from '../models/assignmentModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAssignment = asyncHandler(async (req, res) => {
  const adminId = req.user.userId
  const assignments = await Assignment.find({ admin: adminId })

  if (!assignments || assignments.length === 0) {
    return res
      .status(404)
      .json({ message: 'No assignments found for this admin' })
  }
  res.status(200).send(assignments)
})

export const rejectAssignment = asyncHandler(async (req, res) => {
  const assignmentId = req.params.id // Get assignment ID from the route parameter

  const assignment = await Assignment.findById(assignmentId) // Find assignment by ID

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' })
  }

  if (!(assignment.admin === req.user.userId)) {
    return res
      .status(404)
      .json({ message: 'you can only accept assignment tagged to you ' })
  }
  console.log(!(assignment.admin === req.user.userId))

  assignment.status = 'rejected' // Set assignment as rejected
  await assignment.save() // Save the updated assignment

  res
    .status(200)
    .json({ message: 'Assignment rejected successfully', assignment })
})
export const acceptAssignment = asyncHandler(async (req, res) => {
  const assignmentId = req.params.id // Get assignment ID from the route parameter

  const assignment = await Assignment.findById(assignmentId) // Find assignment by ID

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' })
  }
  if (!(assignment.admin === req.user.userId)) {
    return res
      .status(404)
      .json({ message: 'you can only accept assignment tagged to you ' })
  }
  assignment.status = 'accepted' // Set assignment as rejected
  await assignment.save() // Save the updated assignment

  res
    .status(200)
    .json({ message: 'Assignment accepted successfully', assignment })
})
