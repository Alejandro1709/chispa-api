import { Router } from 'express'
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/postController'
import { protect } from '../middlewares/auth'

const router = Router()

router.route('/').get(getPosts).post(protect, createPost)

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost)

export default router
