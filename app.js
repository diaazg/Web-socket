const express = require('express');
const pool = require(`./client`)

const app = express();
const port = 3000;


pool.on('connect', () => {
    console.log('Connected to the database');
  });
  
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  app.use('/',()=>{
    console.log('fffffffffffffff')
  })

  app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
  })


