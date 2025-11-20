import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { create_update_cart, get_cart_by_id, get_cart_by_user_id, update_cart, delete_cart, cart_request_schema, get_cart_by_user_id_request_schema, get_cart_by_id_request_schema, update_cart_request_schema } from "../controllers/cart.controller.js";

const cart_router = Router()

cart_router.post('/', validate(cart_request_schema), create_update_cart)
cart_router.get('/user/:user_id', validate(get_cart_by_user_id_request_schema, "params"), get_cart_by_user_id)
cart_router.get('/:id', validate(get_cart_by_id_request_schema, "params"), get_cart_by_id)
cart_router.patch('/:id', validate(get_cart_by_id_request_schema, "params"), validate(update_cart_request_schema), update_cart)
cart_router.delete('/:id', validate(get_cart_by_id_request_schema, "params"), delete_cart)

export default cart_router