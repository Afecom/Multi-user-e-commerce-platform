import { z } from 'zod';
export const create_user_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.string().optional()
});
export const sign_up = async (req, res) => {
    res.send("Hello auth");
};
export const login = () => { };
export const update_user = () => { };
//# sourceMappingURL=auth.controller.js.map