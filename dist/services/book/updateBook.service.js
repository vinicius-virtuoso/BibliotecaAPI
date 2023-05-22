"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const updateBookService = async (payload, book_id) => {
    const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const bookFind = await bookRepo.findOneBy({
        id: book_id,
    });
    if (bookFind) {
        const updatedBook = bookRepo.create({
            ...bookFind,
            ...payload,
        });
        const book = bookRepo.save(updatedBook);
        return book;
    }
};
exports.updateBookService = updateBookService;
