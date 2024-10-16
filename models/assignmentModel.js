import mongoose from 'mongoose'

const AssignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Provide userId'],
      ref: 'User', // Reference to the User model
    },

    task: {
      type: String,
      required: [true, 'Provide a task description'],
      trim: true,
    },

    admin: {
      type: String,
      required: [true, 'Provide admin id'],
      ref: 'User', // Reference to the User model
    },

    status: {
      type: String,
      default: 'pending',
    },

    // Added timestamp fields
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to the current date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set to the current date
    },
  },
  { timestamps: true }
) // This option automatically adds createdAt and updatedAt fields

const Assignment = mongoose.model('Assignment', AssignmentSchema)

export default Assignment
