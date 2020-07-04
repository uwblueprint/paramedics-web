require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.PARAMEDICS_DB_USER,
    "password": process.env.PARAMEDICS_DB_PASSWORD,
    "database": process.env.PARAMEDICS_DB_HOST,
    "host": process.env.PARAMEDICS_DB_HOST,
    "port": 5432,
    "dialect": "postgresql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_DB,
    "port": 5432,
    "dialect": "postgresql"
  }
};
