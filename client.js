const {Pool}=require(`pg`)
const clientInfo = require('./constants')

const pool = new Pool({
    user: clientInfo.pg_user,
    host: clientInfo.pg_host,
    database: clientInfo.pg_database,
    password: clientInfo.pg_password,
    port: 5432, 
  });

  pool.on('connect', () => {
    console.log('Connected to the database');
  });
  
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });


  module.exports = {pool}

