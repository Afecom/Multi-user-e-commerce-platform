import { QueryInterface, DataTypes } from "sequelize";

export default {
    async up(queryInterface: QueryInterface){
        await queryInterface.createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.TIME
            },
            updated_at: {
                type: DataTypes.TIME
            }
        })
    },
    async down(queryInterface: QueryInterface){
        await queryInterface.dropTable("users")
    }
}