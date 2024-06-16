import { Router } from 'express'
import fileUpload from 'express-fileupload'

import { verifyToken } from '../middlewares/verifyToken.middlewares'
import * as productController from '../controllers/product.controllers'

const router = Router()

router.get('', productController.getProducts)
router.get('/:id', productController.getProduct)
router.post(
  '/',
  verifyToken,
  fileUpload({ useTempFiles: true, tempFileDir: './uploads' }),
  productController.createProduct,
)
router.patch('/:id', verifyToken, productController.editProduct)
router.patch(
  '/:id/photo',
  verifyToken,
  fileUpload({ useTempFiles: true, tempFileDir: './uploads' }),
  productController.editPhoto,
)
router.delete('/:id', verifyToken, productController.deleteProduct)

export default router
