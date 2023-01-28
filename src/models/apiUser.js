'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ApiUser extends Model {

    }
    ApiUser.init({
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        password: DataTypes.STRING,
        short_description: DataTypes.TEXT,
        token: DataTypes.STRING,
        token_expiry: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ApiUser',
        tableName: 'api_users'
    });
    return ApiUser;
};