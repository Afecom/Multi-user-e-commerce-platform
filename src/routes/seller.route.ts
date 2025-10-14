import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { get_seller_schema } from "../controllers/seller.controller.js";
import { get_seller } from "../controllers/seller.controller.js";
import { admin_user_access } from "../middlewares/access_control_middlewares/admin-user_access_control.js";

const seller_router = Router()

seller_router.get('/', validate(get_seller_schema), admin_user_access, get_seller)

export default seller_router