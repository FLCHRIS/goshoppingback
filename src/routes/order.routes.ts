import { Router } from 'express'

import { verifyToken } from '../middlewares/verifyToken.middlewares'
import * as orderController from '../controllers/order.controllers'

const router = Router()

router.post('/', verifyToken, orderController.createOrder)

export default router
