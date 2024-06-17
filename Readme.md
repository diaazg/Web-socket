# Web socket
It used in **Bidirectionnal** or **Realtime** connection, it use `TCP protocol` to etablish connection between server and client

**Basic Client-Server code snippet** 

## 1- Create HTTP server : 
  ```JavaScript
  const express = require('express')
const authRouter = require('./routers/auth_routes')
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io =  socketIo(server);
const setupSocket = require('./services/socket') 
```
  - why do we need http server ? : Socket.IO needs an HTTP server to attach to, and app is just an instance of the Express application, not an HTTP server. 
  - express application (
    `const app = express()`
    ) : This is responsible for handling HTTP routes and middleware.
  - HTTP Server (
    `const http = require('http')` <br>
    `const server = http.createServer(app)`
  ): This is a low-level HTTP server that handles the actual HTTP requests. The Express   application is just a middleware that runs on top of this server.  
 - Socket.IO (
    `const socketIo = require('socket.io')` <br>
    `const io =  socketIo(server)`
    ): This needs to be attached to the HTTP server to handle WebSocket connections (intercept and handle WebSocket upgrade requests alongside regular HTTP requests).

 - Warning !! Using app.listen instead of server.listen  : 
       If you try to use app directly with server.listen, it won't work because app doesn't have a listen method designed to handle low-level HTTP connections. So you need to use server.listen which is integrated with socket and can handle low-level http requests including WebSocket connections . 
 - Does app still work if we use server.listen ? :
    Yes, The server in this context refers to the HTTP server created using http.createServer(app).
    This server is responsible for handling low-level HTTP requests and  responses.
    Express (app) is attached to this HTTP server, so when a request comes in (e.g., a `GET` request to /users), the server passes that request to Express to handle based on the defined routes. 
## 2- Create WebSocket module : 
  - ###  sending data and handling the received data  **(Client-side)**:
   As we see we can sending data either with send or emit event and we can reading data either with `socket.on('message')` for the data sent by s.send mathod and `socket.on('eventName')` for data sent using eventName.<br>
   **NB :** client can't send any data only if he is connected
   ```JavaScript
   const socket = io("ws://localhost:3000");

  socket.on("connect", () => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("eventName", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
  });
  // "hello" and the json object ...etc are pieces of data

// handle the event sent with socket.send()
 socket.on("message", data => {
  console.log(data);
  });

// handle the event sent with socket.emit()
  socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
 });  

```


  - ###  sending data and handling the received data  **(Server-side)**:
    In the `Socket.js` file we created this module : <br>
    ```JavaScript
    module.exports = (io)=>{
    io.on('connection', (socket) => {
        console.log(`A user connected with id :  ${socket.id}`);
        socket.on('eventName', (data0,data1,data2) => {
          console.log(`Message : ${data0} and json ${JSON.stringify(data1)} sent by ${socket.id}`)
        });
        
        socket.on('message',(data)=>{
            console.log(`Message and send data : ${data}`)
        }) 
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      }) } 
      ```
    **Notes :** <br>
    - As you see all the instructions are inside `io.on('connection')`
    - `socket.on('message')` is used to handle the data sent by `socket.send()` in the **client-side**
    - `socket.id` refers to the client (**user**) who is connected     
    

 
  