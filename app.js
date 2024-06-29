const express = require('express')
const authRouter = require('./routers/auth_routes')
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);

const io = require('./services/socket') 
app.use(express.json());



app.use('/', authRouter)
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/front/index.html');

});
app.get('/chat2', (req, res) => {
  res.sendFile(__dirname + '/front/second.html');

});
app.get('/chat3', (req, res) => {
  res.sendFile(__dirname + '/front/third.html');

});
app.get('/chat4', (req, res) => {
  res.sendFile(__dirname + '/front/forth.html');

});

io.init(server)





server.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})


