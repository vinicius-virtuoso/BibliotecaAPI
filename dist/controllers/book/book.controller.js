"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = exports.BookController = void 0;
const listBook_service_1 = require("../../services/book/listBook.service");
const createBook_service_1 = require("../../services/book/createBook.service");
const retrieveBook_service_1 = require("../../services/book/retrieveBook.service");
const deleteBook_service_1 = require("../../services/book/deleteBook.service");
const updateBook_service_1 = require("../../services/book/updateBook.service");
class BookController {
    async list(req, res) {
        const books = await (0, listBook_service_1.listBookService)();
        return res.status(200).json(books);
    }
    async create(req, res) {
        const body = req.body;
        const book = await (0, createBook_service_1.createBookService)(body);
        return res.status(201).json(book);
    }
    async getBook(req, res) {
        const { book_id } = req.params;
        const book = await (0, retrieveBook_service_1.retrieveBookService)(book_id);
        return res.status(200).json(book);
    }
    async delete(req, res) {
        const { book_id } = req.params;
        await (0, deleteBook_service_1.deleteBookService)(book_id);
        return res.status(204).json();
    }
    async update(req, res) {
        const { book_id } = req.params;
        const payload = req.body;
        const book = await (0, updateBook_service_1.updateBookService)(payload, book_id);
        return res.status(200).json(book);
    }
}
exports.BookController = BookController;
exports.bookController = new BookController();
