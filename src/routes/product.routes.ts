import { Router } from 'express'
import fileUpload from 'express-fileupload'

import { verifyToken } from '../middlewares/verifyToken.middlewares'
import * as productController from '../controllers/product.controllers'

const router = Router()

router.post(
  '/',
  verifyToken,
  fileUpload({ useTempFiles: true, tempFileDir: './uploads' }),
  productController.createProduct,
)
router.delete('/:id', verifyToken, productController.deleteProduct)

export default router
