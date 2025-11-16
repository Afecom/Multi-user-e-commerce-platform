import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { admin_access_control, admin_self_user_access } from "../middlewares/access_control_middlewares/admin-user_access_control.js";
import { create_product, get_product, update_product, delete_product } from "../controllers/product.controller.js";

const product_router = Router()

product_router.post('/')
product_router.get('/:id')
product_router.patch('/:id')
product_router.delete('/:id')

export default product_router