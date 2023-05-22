"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNotExistBook = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyNotExistBook = async (req, res, next) => {
    const { book_id } = req.params;
    const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const findBook = await bookRepo.exist({ where: { id: book_id } });
    if (!findBook) {
        throw new errors_1.AppError('Book not found.', 404);
    }
    return next();
};
exports.verifyNotExistBook = verifyNotExistBook;
