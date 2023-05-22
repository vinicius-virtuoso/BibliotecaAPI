"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyExistLoan = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyExistLoan = async (req, res, next) => {
    const { id: user_id } = req.auth;
    const { book_id } = req.params;
    const copyRepo = data_source_1.AppDataSource.getRepository(entities_1.Copy);
    const copyFind = await copyRepo.findOne({
        where: {
            book: {
                id: book_id,
            },
        },
    });
    if (copyFind) {
        const loanRepo = data_source_1.AppDataSource.getRepository(entities_1.Loan);
        const findLoan = await loanRepo.findOne({
            where: {
                user: {
                    id: user_id,
                },
                copy: {
                    id: copyFind.id,
                },
            },
        });
        if (findLoan) {
            throw new errors_1.AppError('You have already ordered this book, you need to return it to order it again.', 409);
        }
        return next();
    }
};
exports.verifyExistLoan = verifyExistLoan;
