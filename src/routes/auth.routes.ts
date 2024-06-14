import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.middlewares'
import * as authController from '../controllers/auth.controllers'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.logIn)
router.post('/logout', verifyToken, authController.logOut)

export default router
