const express = require('express');
const router = express.Router();
const Controller = require('../controllers/borrow.controller');

router.post('/add', (req, res) => {
    Controller.add(req, res);
})

router.post('/returned-book', (req, res) => {
    Controller.returnedBook(req, res);
})



module.exports = router;