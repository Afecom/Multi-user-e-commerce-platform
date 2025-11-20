import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { checkout, get_orders_by_id, get_orders_by_user_id, checkout_request_schema, get_orders_by_id_schema, get_orders_by_user_id_schema } from "../controllers/order.controller.js";

const order_router = Router()

order_router.get('/user/:user_id', validate(get_orders_by_user_id_schema, "params"), get_orders_by_user_id)
order_router.get('/:id', validate(get_orders_by_id_schema, "params"), get_orders_by_id)
order_router.post('/checkout', validate(checkout_request_schema), checkout)

export default order_router

