"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserExists = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyUserExists = async (req, res, next) => {
    const { email, username } = req.body;
    if (email || username) {
        const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
        const findUser = await userRepo.exist({
            where: [{ email: email }, { username }],
        });
        if (findUser) {
            throw new errors_1.AppError('Email/Username already exists.', 409);
        }
    }
    return next();
};
exports.verifyUserExists = verifyUserExists;
