const express = require('express');
const router = express.Router();
const Controller = require('../controllers/member.controller');

router.post('/add', (req, res) => {
    Controller.add(req, res);
});

router.get('/getAll', (req, res) => {
    Controller.getAll(req, res);
})

router.get('/count-borrowed-book-member', (req, res) => {
    Controller.countBorrowedBook(req, res);
});


module.exports = router;

