const { pool } = require(`../client`)
const bcrypt = require(`bcrypt`);
const {jwt_secret} = require('../constants')
const {bcrypt_rounds} = require('../constants')
const jwt = require('jsonwebtoken');
class AuthServices {
    static async registerUser(userData) {
        try {
            const { username, email, password } = userData;
            const hashedPassword = await bcrypt.hash(password,parseInt(bcrypt_rounds))
            const query = {
                text: 'INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING username',
                values: [username, email, hashedPassword]
            }
            const client = await pool.connect();
            const user = await client.query(query)
            client.release()


            return user.rows

        } catch (error) {
            throw error
        }
    }

    static async loginUser(userData) {

        try {
            const { password, email } = userData
           
            
            const query = {
                text: 'SELECT * FROM users WHERE email = $1 ',
                values: [email]
            }
            const client = await pool.connect();
            let user = await client.query(query)
            client.release()
            user = user.rows[0]

            const match = await bcrypt.compare(password, user.password) 
            /* be carefull we will compare hashed password with unhashed password */

             
            if (!user || !match) {
                
                throw new Error('Wrong credentials');
            }
            

            const accessToken = this.generateToken(user.id,user.username,'1m')
             
           return  accessToken

        } catch (error) {
            throw new Error('Login failed');
        }
    }

    static generateToken(userID, username, expr) {
        const payload = {sub: userID, username: username};
       
        
        const secretKey = jwt_secret;
        
      
        
        const options = {
          expiresIn: expr, 
        };


        const token = jwt.sign(payload, secretKey, options);
        
        return token;
    }
}

module.exports = AuthServices;