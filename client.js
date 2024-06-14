const {Pool}=require(`pg`)
const clientInfo = require('./constants')

const pool = new Pool({
    user: clientInfo.pg_user,
    host: clientInfo.pg_host,
    database: clientInfo.pg_database,
    password: clientInfo.pg_password,
    port: 5432, 
  });

  module.exports = pool

