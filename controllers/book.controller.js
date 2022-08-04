const { Books } = require('../models/index');

class Controller {

    static async add(req, res){
        try {
            const code = req.body.code;
            const title = req.body.title;
            const author = req.body.author;
            const stock = req.body.stock;

            const book = await Books.create({
                code,
                title,
                author,
                stock
            });

            res.status(201).json({
                message: 'Success',
                book
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error.message
            })
        }
    }

}

module.exports = Controller;