import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { get_seller_schema } from "../controllers/seller.controller.js";
import { get_seller } from "../controllers/seller.controller.js";
const seller_router = Router();
seller_router.get('/', validate(get_seller_schema), get_seller);
export default seller_router;
//# sourceMappingURL=seller.route.js.map