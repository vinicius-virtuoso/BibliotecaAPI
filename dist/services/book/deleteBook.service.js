"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const deleteBookService = async (book_id) => {
    const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    return await bookRepo.delete({ id: book_id });
};
exports.deleteBookService = deleteBookService;
