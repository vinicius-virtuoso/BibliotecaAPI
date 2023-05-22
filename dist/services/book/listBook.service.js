"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBookService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const schemas_1 = require("../../schemas");
const listBookService = async () => {
    const booksRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const books = booksRepo.createQueryBuilder('book');
    const booksList = await books
        .leftJoinAndSelect('book.copy', 'copy')
        .leftJoin(entities_1.Follower, 'follower', 'follower.bookId = book.id')
        .leftJoin(entities_1.User, 'user', 'follower.userId = user.id')
        .addSelect('string_agg("copy".id::character varying|| \':\' || "copy".quantity::integer || \':\' || "copy".created_at::date,\',\')', 'copy')
        .addSelect('string_agg("user".id::character varying|| \':\' || "user".username::character varying,\',\')', 'users')
        .where('book.id = book.id')
        .groupBy('book.id, copy.id')
        .getRawMany();
    const booksFormattedList = booksList.map((book) => {
        const copy = book.copy
            ? book.copy.split(',').map((copyString) => {
                const [id, quantity, created_at] = copyString.split(':');
                return {
                    id: id,
                    quantity: Number(quantity),
                    created_at: created_at,
                };
            })[0]
            : {};
        const followers = book.users
            ? book.users.split(',').map((userString) => {
                const [id, username] = userString.split(':');
                return { id: id, username: username };
            })
            : [];
        const followersCount = followers.length;
        return {
            id: book.book_id,
            title: book.book_title,
            synopsis: book.book_synopsis,
            author: book.book_author,
            pages: book.book_pages,
            language: book.book_language,
            date_release: book.book_date_release,
            availability: book.book_availability,
            copy: { ...copy },
            count_followers: followersCount,
            followers: [...followers],
        };
    });
    return schemas_1.returnBookListSchema.parse(booksFormattedList);
};
exports.listBookService = listBookService;
