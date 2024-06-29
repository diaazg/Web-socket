const { text } = require("express")
const { pool } = require(`../client`)



exports.trackingVisits =async (req,res,next,userID)=>{
    
    const query = {
        text:'SELECT visits FROM users WHERE id = $1 ',
        values:[userID]
    }
    const client = pool.connect()
    let visits = await client.query(query)
    client.release()
    visits = visits.rows[0]


}