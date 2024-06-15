const { pool } = require(`../client`)
const bcrypt = require(`bcrypt`);
const { jwt_secret } = require('../constants')
const { bcrypt_rounds } = require('../constants')
const jwt = require('jsonwebtoken');
class AuthServices {
    static async registerUser(userData) {
        try {
            const { username, email, password } = userData;
            const hashedPassword = await bcrypt.hash(password, parseInt(bcrypt_rounds))
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


            const accessToken = this.generateToken(user.id, user.username, '1m')
            const refreshToken = this.generateToken(user.id, user.username, '4m')

            return { accessToken: accessToken, refreshToken: refreshToken }

        } catch (error) {
            throw new Error('Login failed');
        }
    }

    static async refreshToken(data) {
        const oldRefreshToken = data.refreshToken
        let myUser ;
        if(oldRefreshToken){
            jwt.verify(oldRefreshToken, jwt_secret, (err, user) => {
                if (err) {
                    throw new Error('Expire token time')
                }
                myUser = user;
            })
            console.log(myUser.sub)
            console.log(myUser.username)
            const newAccessToken = this.generateToken(myUser.sub, myUser.username, '4m')
            return newAccessToken
        }else{
            throw new Error('Token field is empty')
        }


    }

    static generateToken(userID, username, expr) {
        const payload = { sub: userID, username: username };


        const secretKey = jwt_secret;



        const options = {
            expiresIn: expr,
        };


        const token = jwt.sign(payload, secretKey, options);

        return token;
    }
}

module.exports = AuthServices;