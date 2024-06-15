const express = require('express')
const router = express.Router()
const authController = require('../controller/auth_controller')
const jwtMiddleWar = require('../middleware/authjwt')

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/refresh_token',authController.refreshToken)
router.post('/protect',jwtMiddleWar.authjwt,(req, res) => {
    // Access user info from req.user
    res.json({
      message: 'This is a protected route',
      user: req.user, // Return user info as part of the response
    });
  })


module.exports = router