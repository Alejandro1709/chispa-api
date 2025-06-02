import mongoose from 'mongoose'
import slugify from 'slugify'
import bcrypt from 'bcrypt'
import { IPostDocument } from './Post'

export interface IUserDocument extends mongoose.Document {
  name: string
  username: string
  email: string
  password: string
  posts: IPostDocument[]
  comparePasswords: (
    enteredPassword: string,
    hashedPassword: string
  ) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      select: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('username')) {
    return next()
  }

  this.username = slugify(this.username, { lower: true, replacement: '' })
  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePasswords = async function (
  enteredPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}

const User = mongoose.model('User', userSchema)

export default User
