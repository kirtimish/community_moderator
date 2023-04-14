const express = require('express')
const communityControls = require('../controllers/communityControls')
const { authenticate } = require('../middleware/auth')
const router = express.Router();

router.get('/', communityControls.getAllCommunities)
router.post('/',authenticate,communityControls.createCommunity)
router.get('/:id/members')
router.get('/me/owner')
router.get('/me/member')

module.exports = router;