const express = require('express')
const {pool} = require(`./client`)
const authRouter = require('./routers/auth_routes')
const app = express();
const port = 3000;

app.use(express.json()); 




 app.use('/',authRouter)



  app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
  })


