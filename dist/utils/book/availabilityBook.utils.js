"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityBook = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const sendEmailBook_utils_1 = require("./sendEmailBook.utils");
const availabilityBook = async () => {
    const booksRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const books = booksRepo.createQueryBuilder('book');
    const booksList = await books
        .leftJoin(entities_1.Follower, 'follower', 'follower.bookId = book.id')
        .leftJoin(entities_1.User, 'user', 'follower.userId = user.id')
        .addSelect('string_agg("user".id::character varying|| \':\' || "user".username::character varying,\',\')', 'users')
        .where('book.id = book.id')
        .groupBy('book.id')
        .getRawMany();
    booksList.forEach((book) => {
        const followers = book.users
            ? book.users.split(',').map((userString) => {
                const [id, username] = userString.split(':');
                return { follower_id: id, follower_username: username };
            })
            : [];
        followers.map(async (follower) => {
            const loanRepo = data_source_1.AppDataSource.getRepository(entities_1.Loan);
            const loanFind = await loanRepo.findOne({
                where: {
                    user: {
                        id: follower.follower_id,
                    },
                    copy: { book: { id: book.id } },
                },
            });
            if (!loanFind) {
                const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
                const user = await userRepo.findOneBy({
                    id: follower.follower_id,
                });
                if (user &&
                    user.email &&
                    user.is_blocked_loans === false &&
                    user.date_unlock === null) {
                    await (0, sendEmailBook_utils_1.sendEmailBook)({
                        to: user.email,
                        username: user.username,
                        book: book.book_title,
                    });
                }
            }
        });
    });
};
exports.availabilityBook = availabilityBook;
