"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIsBlockedLoan = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyIsBlockedLoan = async (req, res, next) => {
    const { id: user_id } = req.auth;
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const userFind = await userRepo.findOneBy({ id: user_id });
    if (userFind && userFind.date_unlock) {
        const date = new Date(userFind.date_unlock).toISOString().slice(0, 10);
        throw new errors_1.AppError(`You are blocked from ordering books, if you have already returned them but passed the return date, you must wait until ${date} to apply for new loans.`, 401);
    }
    if (userFind && userFind.is_blocked_loans) {
        throw new errors_1.AppError(`You are blocked from ordering new books. You need to return the books that you have.`, 401);
    }
    return next();
};
exports.verifyIsBlockedLoan = verifyIsBlockedLoan;
