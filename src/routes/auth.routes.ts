import { Router } from 'express'
import * as authController from '../controllers/auth.controllers'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.logIn)
router.post('/logout', authController.logOut)

export default router
