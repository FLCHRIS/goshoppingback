import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.middlewares'
import * as userController from '../controllers/user.controllers'

const router = Router()

router.patch('/:id', verifyToken, userController.editUser)

export default router
