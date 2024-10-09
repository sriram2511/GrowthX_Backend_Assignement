import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },

    userId: {
      type: String,
      required: [true, 'Please Provide unique userId'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please add password!'],
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true, minimize: true }
)

// hash the password before saving
UserSchema.pre('save', async function (next) {
  // check if the password is not modified
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword

  next()
})

const User = mongoose.model('User', UserSchema)

export default User
