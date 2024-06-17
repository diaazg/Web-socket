#Web socket
we use it in Bidirectionnal connection or realtime connection ... it use TCP protocol to etablish connection between server and client

Code explanation : 

#1- create HTTP server : 
  - why do we need http server ? : Socket.IO needs an HTTP server to attach to, and app is just an instance of the Express application, not an HTTP server. 
  - express application (
    const app = express()
    ) : This is responsible for handling HTTP routes and middleware.
  - HTTP Server (
    const http = require('http')
    const server = http.createServer(app)
  ): This is a low-level HTTP server that handles the actual HTTP requests. The Express   application is just a middleware that runs on top of this server.  
 - Socket.IO (
    const socketIo = require('socket.io')
    const io =  socketIo(server)
    ): This needs to be attached to the HTTP server to handle WebSocket connections (intercept and handle WebSocket upgrade requests alongside regular HTTP requests).

 - Warning !! Using app.listen instead of server.listen  : 
       If you try to use app directly with server.listen, it won't work because app doesn't have a listen method designed to handle low-level HTTP connections. So you need to use server.listen which is integrated with socket and can handle low-level http requests including WebSocket connections . 
 - Does app still work if we use server.listen ? :
    Yes, The server in this context refers to the HTTP server created using http.createServer(app).
    This server is responsible for handling low-level HTTP requests and  responses.
    Express (app) is attached to this HTTP server, so when a request comes in (e.g., a GET request to /users), the server passes that request to Express to handle based on the defined routes. 
#2- Create WebSocket module : 
   -     