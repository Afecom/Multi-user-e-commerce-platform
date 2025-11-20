import express, { type Router } from 'express'
import { sign_up, login, update_user, get_user, get_user_schema, create_user_schema, get_all_users, 
    login_user_schema
} from "../controllers/auth.controller.js";
import validate from "../middlewares/runtime_request_body_validator.js";
import { role_checkpoint } from '../middlewares/auth_middlewares/auth.middleware.js';

const auth_router: Router = express.Router()

auth_router.post('/', validate(create_user_schema), sign_up)
auth_router.get('/', validate(get_user_schema, "query"), get_user)
auth_router.get('/users', role_checkpoint("admin"), get_all_users)
auth_router.post('/login', validate(login_user_schema), login)

export default auth_router