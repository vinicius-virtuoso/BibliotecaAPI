"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIsFollower = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyIsFollower = async (req, res, next) => {
    const { id } = req.auth;
    const { book_id } = req.params;
    const followerRepo = data_source_1.AppDataSource.getRepository(entities_1.Follower);
    const followerFind = await followerRepo.findOne({
        where: { user: { id: id }, book: { id: book_id } },
    });
    if (followerFind) {
        throw new errors_1.AppError('You are already following this book.', 409);
    }
    return next();
};
exports.verifyIsFollower = verifyIsFollower;
