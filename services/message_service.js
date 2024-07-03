const { pool } = require(`../client`)

class MessageSerivce {
    static async getAll (body){
        
          const {recipent_id,sender_id} = body
       
       try {

        const query =  {
            text: 'SELECT * FROM message WHERE (recipent_id = $1 and sender_id = $2) or (recipent_id = $2 and sender_id = $1)  order by create_at desc limit 10',
            values: [recipent_id,sender_id]
        }
        const client = await pool.connect();
        const messages = await client.query(query)
        client.release()
        return messages.rows


       } catch (error) {
        throw error
       }


    }
}

module.exports = MessageSerivce