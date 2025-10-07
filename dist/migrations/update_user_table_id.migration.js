import { QueryInterface, DataTypes } from "sequelize";
export default {
    async up(queryInterface) {
        await queryInterface.addColumn("users", "id", {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        });
    },
    async down(queryInterface) {
        await queryInterface.removeColumn("users", "id");
    }
};
//# sourceMappingURL=update_user_table_id.migration.js.map