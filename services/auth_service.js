const {pool} = require(`../client`)

class AuthServices {
    static async registerUser(userData){
        try {
            const {username , email , password} = userData; 
            const query = {
                text:'INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING username',
                values : [username,email,password]
            } 
          const client = await pool.connect(); 
          const user =  await client.query(query)
          client.release()
          

          return user.rows
            
        } catch (error) {
            throw error
        }
    }
}

module.exports = AuthServices;