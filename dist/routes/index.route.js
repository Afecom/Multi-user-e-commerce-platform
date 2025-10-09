import express, {} from 'express';
import auth_router from './auth.route.js';
const index_router = express.Router();
index_router.use('/auth', auth_router);
export default index_router;
//# sourceMappingURL=index.route.js.map