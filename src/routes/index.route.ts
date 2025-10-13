import express, { type Router } from 'express'
import auth_router from './auth.route.js'
import seller_router from './seller.route.js'

const index_router: Router = express.Router()

index_router.use('/auth', auth_router)
index_router.use('/seller', seller_router)

export default index_router