"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolutionLoanService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const devolutionLoanService = async (user_id, book_id) => {
    const copyRepo = data_source_1.AppDataSource.getRepository(entities_1.Copy);
    const copyFind = await copyRepo.findOne({
        where: { book: { id: book_id } },
        relations: {
            book: true,
        },
    });
    if (copyFind) {
        const loanRepo = data_source_1.AppDataSource.getRepository(entities_1.Loan);
        const loanFind = await loanRepo.findOne({
            where: {
                copy: {
                    id: copyFind.id,
                },
                user: {
                    id: user_id,
                },
            },
            relations: {
                user: true,
            },
        });
        if (loanFind) {
            // verifica se a devolução é atrasada
            const currentDate = new Date();
            if (new Date(loanFind.devolution_at).getTime() < currentDate.getTime()) {
                const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
                const userFind = await userRepo.findOneBy({ id: loanFind.user.id });
                const userCreateDateUnlocked = userRepo.create({
                    ...userFind,
                    is_blocked_loans: false,
                    date_unlock: new Date(currentDate.setDate(currentDate.getDate() + 2)),
                });
                await userRepo.save(userCreateDateUnlocked);
            }
            await loanRepo.delete({ id: loanFind.id });
            await copyRepo.save({
                ...copyFind,
                quantity: copyFind.quantity + 1,
            });
            const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
            const findBook = await bookRepo.findOneBy({ id: copyFind.book.id });
            await bookRepo.save({
                ...findBook,
                availability: true,
            });
        }
        else {
            throw new errors_1.AppError('loan not found.', 404);
        }
    }
};
exports.devolutionLoanService = devolutionLoanService;
