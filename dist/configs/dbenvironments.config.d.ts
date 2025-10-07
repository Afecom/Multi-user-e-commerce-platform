import type { Dialect } from 'sequelize';
interface Iconifg {
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
    dialect: Dialect;
}
export declare const development: Iconifg;
declare const _default: {
    development: Iconifg;
};
export default _default;
//# sourceMappingURL=dbenvironments.config.d.ts.map