import { Router } from "express";
import validate from "../middlewares/runtime_request_body_validator.js";
import { get_seller_schema } from "../controllers/seller.controller.js";
import { get_seller, get_sellers } from "../controllers/seller.controller.js";
import { admin_user_access } from "../middlewares/access_control_middlewares/admin-user_access_control.js";
const seller_router = Router();
seller_router.get('/unique', validate(get_seller_schema), admin_user_access, get_seller);
seller_router.get('/', admin_user_access, get_sellers);
export default seller_router;
//# sourceMappingURL=seller.route.js.map