"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const loan_controller_1 = require("../controllers/loan/loan.controller");
exports.loanRouter = (0, express_1.Router)();
exports.loanRouter.get('/my-loans', middlewares_1.validateToken, loan_controller_1.loanController.list);
exports.loanRouter.post('/:book_id', middlewares_1.validateToken, middlewares_1.verifyNotExistBook, middlewares_1.verifyIsBlockedLoan, middlewares_1.verifyExistLoan, loan_controller_1.loanController.create);
exports.loanRouter.delete('/my-loans/:book_id', middlewares_1.validateToken, loan_controller_1.loanController.devolution);
