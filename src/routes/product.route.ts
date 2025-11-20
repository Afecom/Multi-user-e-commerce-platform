import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { seller_or_admin, seller_admin_access } from "../middlewares/access_control_middlewares/seller-admin_access_control.js";
import { create_product, get_product, update_product, delete_product } from "../controllers/product.controller.js";
import { create_product_schema, get_product_schema, update_product_schema } from "../controllers/product.controller.js";

const product_router = Router()

product_router.post('/', validate(create_product_schema), seller_admin_access, create_product)
product_router.get('/:id', validate(get_product_schema, "params"), get_product)
product_router.patch('/:id', validate(get_product_schema, "params"), seller_or_admin("products"), validate(update_product_schema), update_product)
product_router.delete('/:id', validate(get_product_schema, "params"), seller_or_admin("products"), delete_product)

export default product_router