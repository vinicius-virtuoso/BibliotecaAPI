"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanController = exports.LoanController = void 0;
const listLoan_service_1 = require("../../services/loan/listLoan.service");
const devolutionLoan_service_1 = require("../../services/loan/devolutionLoan.service");
const createLoan_service_1 = require("../../services/loan/createLoan.service");
class LoanController {
    async list(req, res) {
        const { id: user_id } = req.auth;
        const loans = await (0, listLoan_service_1.listLoanService)(user_id);
        return res.status(200).json(loans);
    }
    async create(req, res) {
        const { id: user_id } = req.auth;
        const { book_id } = req.params;
        const loan = await (0, createLoan_service_1.createLoanService)(user_id, book_id);
        return res.status(201).json(loan);
    }
    async devolution(req, res) {
        const { id: user_id } = req.auth;
        const { book_id } = req.params;
        await (0, devolutionLoan_service_1.devolutionLoanService)(user_id, book_id);
        return res.status(204).json();
    }
}
exports.LoanController = LoanController;
exports.loanController = new LoanController();
