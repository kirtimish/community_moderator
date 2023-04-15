const express = require('express')
const communityControls = require('../controllers/communityControls')
const { authenticate } = require('../middleware/auth')
const router = express.Router();

router.get('/', communityControls.getAllCommunities)
router.post('/',authenticate,communityControls.createCommunity)
router.get('/:id/members',communityControls.getAllMembers)
router.get('/me/owner', authenticate,communityControls.getMyOwnedCommunities)
router.get('/me/member',authenticate, communityControls.getMyJoinedCommunities)

module.exports = router;