const express = require('express')
const router = express.Router()
const message_controller = require('../controller/message_controller')


router.get('/all',message_controller.allMessages)

module.exports = router