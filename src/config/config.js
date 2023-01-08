require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME || 'mysql',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || "database_development",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DRIVER || 'mysql',
        "logging": false

    },
    "test": {
        "username": process.env.DB_USERNAME || 'postgres',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || "database_test",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DRIVER || 'postgres',
        "logging": false
    },
    "production": {
        "username": process.env.DB_USERNAME || 'postgres',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || "database_production",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DRIVER || 'postgres',
        "logging": false

    }
};
