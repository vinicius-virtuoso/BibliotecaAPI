"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoanService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const createLoanService = async (user_id, book_id) => {
    const copyRepo = data_source_1.AppDataSource.getRepository(entities_1.Copy);
    const copyFind = await copyRepo.findOne({
        where: { book: { id: book_id } },
        relations: {
            book: true,
        },
    });
    if (copyFind && copyFind?.quantity > 0) {
        const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
        const userFind = await userRepo.findOneBy({ id: user_id });
        if (userFind && copyFind && copyFind.quantity > 0) {
            const loanRepo = data_source_1.AppDataSource.getRepository(entities_1.Loan);
            const loanCreate = loanRepo.create({ user: userFind, copy: copyFind });
            const loan = await loanRepo.save(loanCreate);
            await copyRepo.save({
                ...copyFind,
                quantity: copyFind.quantity - 1,
            });
            if (copyFind?.quantity - 1 === 0) {
                const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
                const findBook = await bookRepo.findOneBy({ id: copyFind.book.id });
                await bookRepo.save({
                    ...findBook,
                    availability: false,
                });
            }
            return schemas_1.returnLoanSchema.parse(loan);
        }
    }
    else {
        throw new errors_1.AppError('This book is unavailable.', 403);
    }
};
exports.createLoanService = createLoanService;
