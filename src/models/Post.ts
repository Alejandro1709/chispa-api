import mongoose from 'mongoose'
import { IUserDocument } from './User'

export interface IPostDocument extends mongoose.Document {
  content: string
  user: IUserDocument
}

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
