import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },

    email: {
      type: String,
      required: [true, 'Please an email'],
      unique: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please add a valid email',
      ],
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
