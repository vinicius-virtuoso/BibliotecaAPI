"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFollowerOfBook = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const createFollowerOfBook = async (user_id, book_id) => {
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const bookRepo = data_source_1.AppDataSource.getRepository(entities_1.Book);
    const user = await userRepo.findOne({ where: { id: user_id } });
    const book = await bookRepo.findOne({ where: { id: book_id } });
    if (book && user) {
        const followerRepo = data_source_1.AppDataSource.getRepository(entities_1.Follower);
        const followerCreate = followerRepo.create({ book, user });
        const followerSave = await followerRepo.save(followerCreate);
        if (followerSave && followerSave.id) {
            return await followerRepo.findOne({
                where: { id: followerSave.id },
                relations: { book: true, user: true },
            });
        }
    }
};
exports.createFollowerOfBook = createFollowerOfBook;
