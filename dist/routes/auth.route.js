import express, {} from 'express';
import { sign_up, login, update_user } from "../controllers/auth.controller.js";
import validate from "../middlewares/runtime_request_body_validator.js";
import { create_user_schema } from "../controllers/auth.controller.js";
const auth_router = express.Router();
auth_router.post('/', validate(create_user_schema), sign_up);
export default auth_router;
//# sourceMappingURL=auth.route.js.map