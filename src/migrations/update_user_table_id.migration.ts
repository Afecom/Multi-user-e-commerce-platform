import { QueryInterface, DataTypes } from "sequelize";

export default {
    async up(queryInterface: QueryInterface){
        await queryInterface.addColumn("users", "id", {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        })
    },
    async down(queryInterface: QueryInterface){
        await queryInterface.removeColumn("users", "id")
    }
}