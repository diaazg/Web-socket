const socketIo = require('socket.io');

const users = new Map()

const init = (server)=>{
  const io =  socketIo(server);  


    io.on('connection', (socket) => {
      const uid = socket.handshake.query.uid
      const des = socket.handshake.query.des 
         
        //console.log(`A user connected with id :  ${socket.uid}`);
        console.log(`A user connected with id :  ${uid}`);
        users.set(uid,socket.id)
        



        
        socket.on('send message', (msg,data) => {
          console.log(`Message : ${msg} and json ${JSON.stringify(data)} sent by ${socket.id}`)
        });
        socket.on('message',(data)=>{
          const socketDes = users.get(des)
          if (socketDes){
            io.to(socketDes).emit('message',data)
            console.log(`Message and send data : ${data}`)

          }
           
 
        }) 
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      })
    
}

module.exports = {
  init
}