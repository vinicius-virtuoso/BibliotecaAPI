"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyExistBook = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyExistBook = async (req, res, next) => {
    const { title } = req.body;
    console.log('sdsd');
    if (title) {
        const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
        const findBook = await bookRepo.exist({ where: { title: title } });
        if (findBook) {
            throw new errors_1.AppError('Book already exists.', 409);
        }
    }
    return next();
};
exports.verifyExistBook = verifyExistBook;
