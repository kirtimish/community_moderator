const express = require('express')
const roleControls = require('../controllers/roleControls')
const router = express.Router();

router.get('/',roleControls.getAllRoles)
router.post('/',roleControls.createRole)

module.exports = router;