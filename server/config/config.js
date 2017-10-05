const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "Postgres@007",
    "database": "more-recipes-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "Postgres@007",
    "database": "more-recipes-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "Postgres@007",
    "database": "more-recipes-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
