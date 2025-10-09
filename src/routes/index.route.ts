import express, { type Router } from 'express'
import auth_router from './auth.route.js'

const index_router: Router = express.Router()

index_router.use('/auth', auth_router)

export default index_router