import express, { type Router } from 'express'
import auth_router from './auth.route.js'
import seller_router from './seller.route.js'
import category_router from './category.route.js'
import product_router from './product.route.js'

const index_router: Router = express.Router()

index_router.use('/auth', auth_router)
index_router.use('/sellers', seller_router)
index_router.use('/categories', category_router)
index_router.use('/products', product_router)

export default index_router