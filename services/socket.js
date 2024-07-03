const socketIo = require('socket.io');
const { pool } = require(`../client`)

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
        socket.on('message',async (data)=>{
          const socketDes = users.get(des)
          const socketSrc = users.get(uid)
          
          if (socketDes){
            
            const query = {
              text: 'INSERT INTO message (recipent_id,sender_id,content) VALUES ($1,$2,$3) returning *',
              values: [des, uid, data]
          }
          
          const client = await pool.connect();
          try {
            const result = await client.query(query);
            const insertedRow = result.rows[0];
            io.to(socketDes).emit('message',insertedRow)
            console.log('stika',insertedRow)
            io.to(socketSrc).emit('sent',insertedRow)
            console.log(`Message and send data : ${data}`)
            } catch(e){
                   throw e
            } 
            finally {
            client.release();
            }
          
            
            

          }
           
 
        }) 
        socket.on('typing',(data)=>{
          console.log('phone is typing')
        })
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      })
    
}

module.exports = {
  init
}