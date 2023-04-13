const express = require('express')
const userControls = require('../controllers/userControls')
const router = express.Router();

router.get('/me',userControls.decodeToken)
router.post('/signup',userControls.signup)
router.post('/signin',userControls.signin)

module.exports = router;