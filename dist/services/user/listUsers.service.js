"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const user_schema_1 = require("../../schemas/user/user.schema");
const listUserService = async () => {
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const listUser = await userRepo.find();
    return user_schema_1.returnUsersListSchema.parse(listUser);
};
exports.listUserService = listUserService;
