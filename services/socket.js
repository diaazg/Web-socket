module.exports = (io)=>{
    io.on('connection', (socket) => {
        console.log(`A user connected with id :  ${socket.id}`);
        socket.on('send message', (msg,data) => {
          console.log(`Message : ${msg} and json ${JSON.stringify(data)} sent by ${socket.id}`)
        });
        socket.on('message',(data)=>{
            console.log(`Message and send data : ${data}`)
        }) 
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      })
    
}