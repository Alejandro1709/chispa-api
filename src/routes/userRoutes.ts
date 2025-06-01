import { Router } from 'express'
import { protect } from '../middlewares/auth'
import { getAuthUser } from '../controllers/userController'

const router = Router()

router.get('/me', protect, getAuthUser)

export default router
