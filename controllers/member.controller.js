const { Members, BookBorrowing, sequelize } = require('../models/index');

class Controller {
    static async add(req, res){
        try {

        //get count data from table member
        const count = await Members.count();

        //generate code of member
        let number = "" + Number(count + 1);
        console.log(number);
        let pad = "M000"
        let code_generate = pad.substring(0, pad.length - number.length) + number;

        const code = code_generate
        const name = req.body.name;

        const data = await Members.create({
            code,
            name
        })

        res.status(201).json({
            message: 'Success',
            data
        })

        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error.message
            })
        }
    }

    static async getAll(req, res){
        try {
            const member_data = await Members.findAll({
                order: [
                    ['code', 'DESC']
                ]
            });

            if(member_data == null){
                res.status(204).json({
                    message: 'Data not found',
                    data: member_data
                })
            }

            res.status(200).json({
                message: 'Success',
                member_data
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error.message
            })
        }
    }

    static async countBorrowedBook(req, res){

        try {
            const data = await Members.findAll({
                attributes: {
                    include: [
                        [sequelize.fn('COUNT', sequelize.col('book_borrowing.book_code')), 'count']
                    ]
                },
                include: [
                    {
                        model: BookBorrowing, as: 'book_borrowing',
                    }
                ],
            })

            if(data == null){
                res.status(204).json({
                    message: 'Data not found',
                    data: data
                })
            }

            res.status(200).json({
                message: 'Success',
                data
            });

        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error.message
            })
        }
    }
}

module.exports = Controller;