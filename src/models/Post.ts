import mongoose from 'mongoose'

export interface IPostDocument extends mongoose.Document {
  content: string
}

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
