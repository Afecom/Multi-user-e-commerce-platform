import { Router } from "express";
import { admin_access_control, admin_self_user_access } from "../middlewares/access_control_middlewares/admin-user_access_control.js";
import validate from "../middlewares/runtime_request_body_validator.js";
import { create_category, get_category, update_category, delete_category } from "../controllers/category.controller.js";
import { seller_admin_access } from "../middlewares/access_control_middlewares/category_access_control.js";
import { create_category_schema, get_category_schema } from "../controllers/category.controller.js";

const category_router = Router()

category_router.post('/', validate(create_category_schema), seller_admin_access, create_category)
category_router.get('/:id', get_category)

export default category_router