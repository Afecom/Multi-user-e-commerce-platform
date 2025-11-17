import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { create_cart, get_cart, update_cart, delete_cart } from "../controllers/cart.controller.js";

const cart_router = Router()



export default cart_router