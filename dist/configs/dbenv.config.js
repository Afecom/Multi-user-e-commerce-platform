import { Sequelize } from "sequelize";
import { development } from './sequelize.config.js';
const db_envs = {
    dev_db: new Sequelize(development)
};
export default db_envs;
//# sourceMappingURL=dbenv.config.js.map