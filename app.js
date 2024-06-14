const express = require('express');
const {pool} = require(`./client`)

const app = express();
const port = 3000;

app.use(express.json()); 




  app.post('/users', async (req, res) => {
    console.log(req.body)
    const { username,email, password  } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO users (username, password,email) VALUES ($1, $2,$3) RETURNING *',
        [username, password,email]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
  })


