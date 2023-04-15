const express = require('express')
const { authenticate } = require('../middleware/auth')
const memberControls = require('../controllers/memberControls')
const router = express.Router();

router.post('/',authenticate,memberControls.addMember)
router.delete('/:id',authenticate,memberControls.deleteMember)

module.exports = router;