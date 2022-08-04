const express = require('express');
const router = express.Router();
const Controller = require('../controllers/book.controller');

router.post('/add', (req, res) => {
    Controller.add(req, res);
});

module.exports = router;