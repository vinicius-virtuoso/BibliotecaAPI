"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveBookService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const schemas_1 = require("../../schemas");
const retrieveBookService = async (book_id) => {
    const booksRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const booksQueryBuilder = booksRepo.createQueryBuilder('book');
    const bookData = await booksQueryBuilder
        .leftJoinAndSelect('book.copy', 'copy')
        .leftJoin(entities_1.Follower, 'follower', 'follower.bookId = book.id')
        .leftJoin(entities_1.User, 'user', 'follower.userId = user.id')
        .addSelect('string_agg("copy".id::character varying|| \':\' || "copy".quantity::integer || \':\' || "copy".created_at::date,\',\')', 'copy')
        .addSelect('string_agg("user".id::character varying|| \':\' || "user".username::character varying,\',\')', 'users')
        .where('book.id = :book_id', { book_id })
        .groupBy('book.id, copy.id')
        .getRawOne();
    const copy = bookData.copy
        ? bookData.copy.split(',').map((copyString) => {
            const [id, quantity, created_at] = copyString.split(':');
            return {
                id: id,
                quantity: Number(quantity),
                created_at: created_at,
            };
        })[0]
        : {};
    const followers = bookData.users
        ? bookData.users.split(',').map((userString) => {
            const [id, username] = userString.split(':');
            return { id: id, username: username };
        })
        : [];
    const followersCount = followers.length;
    const formattedBook = {
        id: bookData.book_id,
        title: bookData.book_title,
        synopsis: bookData.book_synopsis,
        author: bookData.book_author,
        pages: bookData.book_pages,
        language: bookData.book_language,
        date_release: bookData.book_date_release,
        availability: bookData.book_availability,
        copy: { ...copy },
        count_followers: followersCount,
        followers: [...followers],
    };
    console.log('eweq');
    return schemas_1.returnBookOneSchema.parse(formattedBook);
};
exports.retrieveBookService = retrieveBookService;
