import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { create_category, get_category, update_category, delete_category } from "../controllers/category.controller.js";
import { seller_admin_access, seller_or_admin } from "../middlewares/access_control_middlewares/seller-admin_access_control.js";
import { create_category_schema, get_category_schema, update_category_schema } from "../controllers/category.controller.js";

const category_router = Router()

category_router.post('/', validate(create_category_schema), seller_admin_access, create_category)
category_router.get('/:id', validate(get_category_schema, "params"), get_category)
category_router.patch('/:id', validate(get_category_schema, "params"), seller_or_admin("categories"), validate(update_category_schema), update_category)
category_router.delete('/:id', validate(get_category_schema, "params"), seller_or_admin("categories"), delete_category)

export default category_router