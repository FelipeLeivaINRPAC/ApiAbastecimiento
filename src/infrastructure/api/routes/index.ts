import express from 'express'
import usersRouter from './users.js'
import productsRouter from './products.js'
import authenticateRouter from './authenticate.js'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/products', productsRouter)
router.use('/authenticate', authenticateRouter)

export default router
