const { BookBorrowing, Books, Pinalty, Members } = require('../models/index');
const sequelize = require('../models');
const date = new Date();
const dayHelper = require('../helpers/day.helper');

class Controller {

    static async add(req, res){
        try {

        const member_code = req.body.member_code;
        const book_code = req.body.book_code;

        //get data for check book id borrowed or not
        const checkBook = await BookBorrowing.findOne({
            where: {
                book_code: book_code,
            }
        });

        //check member, if member already borrowed 2 book or no
        const checkMember = await BookBorrowing.count({
            col: 'member_code',
            where: {
                member_code : member_code,
            }
        });

        const checkPinalty = await Pinalty.findOne({
            where: {
                member_code : member_code,
            }
        });

        //if check book value is null, then book is not borrowed and can be borrowed
        //after check this, to check member if borrowed 2 book or no
        if(checkBook == null){

            if(checkMember >= 2){
                res.status(400).json({
                    message: 'Member already borrowed 2 book',
                    data: checkMember
                })
            } else {

                if(checkPinalty == null){

                     //borrow book
                        const book_borrowing = await BookBorrowing.create({
                            member_code,
                            book_code,
                            start_date: date.toLocaleDateString('en-CA'),
                            end_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() +6)
                        });

                        const previousValue = await Books.findOne({
                            where: {
                                code: book_code
                            }
                        });

                        const newValue = Number(previousValue.stock) - Number(1);

                        const updated_stock = await Books.update({
                            stock: newValue
                        },{
                            where: {
                                code: book_code,
                            }
                        })

                        res.status(201).json({
                            message: 'Success',
                            book_borrowing,
                            updated_stock,
                        })

                } else {

                    const day = await dayHelper.getNumberOfDays(checkPinalty.start_date,  "2022-08-08");

                    if(day > 3){
                        //deleted data on pinalty

                        const deleted_pinalty = await Pinalty.destroy({
                            where: {
                                member_code : member_code,
                            }
                        })

                        //borrow book
                        const book_borrowing = await BookBorrowing.create({
                            member_code,
                            book_code,
                            start_date: date.toLocaleDateString('en-CA'),
                            end_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() +6)
                        });

                        const previousValue = await Books.findOne({
                            where: {
                                code: book_code
                            }
                        });

                        const newValue = Number(previousValue.stock) - Number(1);

                        const updated_stock = await Books.update({
                            stock: newValue
                        },{
                            where: {
                                code: book_code,
                            }
                        })

                        res.status(201).json({
                            message: 'Success',
                            book_borrowing,
                            updated_stock,
                            deleted_pinalty
                        })

                    } else {

                        res.status(400).json({
                            message: `Member already have pinalty for 3 days, until ${checkPinalty.end_date}`,
                            data: checkPinalty
                        });

                    }

                }

            }

         } else {
            res.status(409).json({
                message: 'Book is already borrowed',
                data: checkBook
            })
        }


        } catch (error) {
            res.status(500).json({
                message: 'Error',
                error: error.message
            })
        }
    }

    static async returnedBook(req, res){
        try {
            const member_code = req.body.member_code;
            const book_code = req.body.book_code;

            const  get_borrowed_book = await BookBorrowing.findOne({
                where: {
                    book_code: book_code,
                    member_code: member_code,
                }
            });

            if( get_borrowed_book == null){

                res.status(400).json({
                    message: 'Book is not borrowed',
                    data: get_book
                });

            } else {

                //count how many day book is borrowed
                const day = await dayHelper.getNumberOfDays(get_borrowed_book.start_date,  "2022-08-12");

                //if book is borrowed for more than 7 days, then add pinalty
                if(day > 7){

                     const previousValue = await Books.findOne({
                        where: {
                            code: book_code
                        }
                    });

                    const newValue = Number(previousValue.stock) + Number(1);

                    const updated_stock = await Books.update({
                        stock: newValue
                    },{
                        where: {
                            code: book_code,
                        }
                    });

                    const returned = await BookBorrowing.destroy({
                        where: {
                            book_code: book_code,
                        }
                    })

                    const pinalty = await Pinalty.create({
                        member_code,
                        start_date: date.toLocaleDateString('en-CA'),
                        end_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() +2)
                    })

                    res.status(200).json({
                        message: 'Success',
                        get_borrowed_book,
                        updated_stock,
                        returned,
                        pinalty
                    })

                } else {

                    const previousValue = await Books.findOne({
                        where: {
                            code: book_code
                        }
                    });

                    const newValue = Number(previousValue.stock) + Number(1);

                    const updated_stock = await Books.update({
                        stock: newValue
                    },{
                        where: {
                            code: book_code,
                        }
                    });

                    const returned = await BookBorrowing.destroy({
                        where: {
                            book_code: book_code,
                        }
                    })

                    res.status(200).json({
                        message: 'Success',
                        get_borrowed_book,
                        updated_stock,
                        returned
                    })


                }


            }

        } catch (error) {

        }
    }



}

module.exports = Controller;