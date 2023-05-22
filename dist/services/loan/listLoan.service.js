"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLoanService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const loan_schema_1 = require("../../schemas/loan/loan.schema");
const listLoanService = async (user_id) => {
    const loanRepo = data_source_1.AppDataSource.getRepository(entities_1.Loan);
    const findLoans = await loanRepo.find({
        where: {
            user: {
                id: user_id,
            },
        },
        relations: {
            user: true,
            copy: {
                book: true,
            },
        },
    });
    return loan_schema_1.returnLoanListSchema.parse(findLoans);
};
exports.listLoanService = listLoanService;
