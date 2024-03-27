const express = require('express');
const { getBootcamps, getBootcamp } = require('../controllers/bootcamps');

const router = express.Router();

router.route('/').get(getBootcamps);
router.route('/:id').get(getBootcamp);

module.exports = router;
