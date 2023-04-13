const express = require('express')
const router = express.Router();

router.get('/')
router.post('/')
router.get('/:id/members')
router.get('/me/owner')
router.get('/me/member')

module.exports = router;