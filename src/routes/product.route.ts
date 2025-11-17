import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { seller_or_admin, seller_admin_access } from "../middlewares/access_control_middlewares/seller-admin_access_control.js";
import { create_product, get_product, update_product, delete_product } from "../controllers/product.controller.js";
import { create_product_schema, get_product_schema } from "../controllers/product.controller.js";

const product_router = Router()

product_router.post('/', validate(create_product_schema), seller_admin_access, create_product)
product_router.get('/', validate(get_product_schema), get_product)
// product_router.patch('/:id')
// product_router.delete('/:id')

export default product_router