import { Router } from 'express'
import * as authController from '../controllers/auth.controllers'

const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.logIn)

export default router
