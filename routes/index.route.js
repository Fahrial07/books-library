const express = require('express');
const router = express.Router();

const memberRoute = require('./member.route');
const bookRoute = require('./book.route');
const borrowRoute = require('./borrow.route');

router.use('/member', memberRoute);
router.use('/book', bookRoute);
router.use('/borrow', borrowRoute);

module.exports = router;