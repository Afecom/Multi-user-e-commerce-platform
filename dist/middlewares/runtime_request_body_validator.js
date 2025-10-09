import { z } from 'zod';
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: result.error.message
        });
    }
    req.body = result.data;
    next();
};
export default validate;
//# sourceMappingURL=runtime_request_body_validator.js.map