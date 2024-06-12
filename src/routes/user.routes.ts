import { Router } from 'express'
import fileUpload from 'express-fileupload'

import { verifyToken } from '../middlewares/verifyToken.middlewares'
import * as userController from '../controllers/user.controllers'

const router = Router()

router.patch('/:id', verifyToken, userController.editUser)
router.patch(
  '/:id/photo',
  verifyToken,
  fileUpload({ useTempFiles: true, tempFileDir: './uploads' }),
  userController.editPhoto,
)

export default router
