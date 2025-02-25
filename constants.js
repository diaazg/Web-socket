require('dotenv').config();

const pg_user = process.env.USER;
const pg_password = process.env.PASSWORD;
const pg_database = process.env.DATABASE;
const pg_host = process.env.HOST;

const bcrypt_rounds = process.env.ROUNDS ;

const jwt_secret = process.env.JWTSECRET



module.exports = {
  pg_user,
  pg_password,
  pg_database,
  pg_host,
  bcrypt_rounds,
  jwt_secret
};
