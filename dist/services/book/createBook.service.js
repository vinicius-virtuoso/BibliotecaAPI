"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const createBookService = async (payload) => {
    const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const booCreate = bookRepo.create(payload);
    const book = await bookRepo.save(booCreate);
    if (book && book.id) {
        const copyRepo = data_source_1.AppDataSource.getRepository(entities_1.Copy);
        const copyCreate = copyRepo.create({
            quantity: payload.quantity_copy,
            book: book,
        });
        const copy = await copyRepo.save(copyCreate);
        return {
            id: book.id,
            title: book.title,
            synopsis: book.synopsis,
            author: book.author,
            pages: book.pages,
            language: book.language,
            date_release: book.date_release,
            availability: book.availability,
            copy: { quantity: copy.quantity },
        };
    }
};
exports.createBookService = createBookService;
