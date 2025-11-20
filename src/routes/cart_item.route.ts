import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { create_cart_item, get_cart_item_by_id, update_cart_item, delete_cart_item, create_cart_item_request_schema, get_cart_item_request_schema, update_cart_item_request_schema } from "../controllers/cart_item.controller.js";

const cart_item_router = Router()

cart_item_router.post('/', validate(create_cart_item_request_schema), create_cart_item)
cart_item_router.get('/:id', validate(get_cart_item_request_schema, "params"), get_cart_item_by_id)
cart_item_router.patch('/:id', validate(get_cart_item_request_schema, "params"), validate(update_cart_item_request_schema), update_cart_item)
cart_item_router.delete('/:id', validate(get_cart_item_request_schema, "params"), delete_cart_item)

export default cart_item_router