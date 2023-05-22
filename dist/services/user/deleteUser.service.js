"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const deleteUserService = async (user_id) => {
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    return await userRepo.delete({ id: user_id });
};
exports.deleteUserService = deleteUserService;
