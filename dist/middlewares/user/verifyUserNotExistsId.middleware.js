"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserNotExistsId = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const verifyUserNotExistsId = async (req, res, next) => {
    const { user_id } = req.params;
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const findUser = await userRepo.exist({
        where: { id: user_id },
    });
    if (!findUser) {
        throw new errors_1.AppError('User not found.', 404);
    }
    return next();
};
exports.verifyUserNotExistsId = verifyUserNotExistsId;
