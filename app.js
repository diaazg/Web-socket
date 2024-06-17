const express = require('express')
const authRouter = require('./routers/auth_routes')
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io =  socketIo(server);
const setupSocket = require('./services/socket') 

app.use(express.json());



app.use('/', authRouter)
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/front/index.html');

});

setupSocket(io)





server.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})


