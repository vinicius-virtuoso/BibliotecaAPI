"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserNotExists = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyUserNotExists = async (req, res, next) => {
    const { email, username } = req.body;
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const findUser = await userRepo.exist({
        where: [{ email }, { username }],
    });
    if (!findUser) {
        throw new errors_1.AppError('User not found.', 404);
    }
    return next();
};
exports.verifyUserNotExists = verifyUserNotExists;
