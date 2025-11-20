import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { get_seller_schema, update_seller_schema } from "../controllers/seller.controller.js";
import { get_seller, get_sellers, delete_seller, update_seller} from "../controllers/seller.controller.js";
import { admin_self_user_access, admin_access_control } from "../middlewares/access_control_middlewares/admin-user_access_control.js";

const seller_router = Router()

seller_router.get('/unique', validate(get_seller_schema, "query"), admin_self_user_access, get_seller)
seller_router.get('/', admin_access_control, get_sellers)
seller_router.delete('/', validate(get_seller_schema, "query"), admin_self_user_access, delete_seller)
seller_router.patch('/', validate(update_seller_schema), admin_self_user_access, update_seller)

export default seller_router