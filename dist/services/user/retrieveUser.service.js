"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const schemas_1 = require("../../schemas");
const retrieveUserService = async (user_id) => {
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const user = await userRepo.findOneBy({ id: user_id });
    return schemas_1.returnUserSchema.parse(user);
};
exports.retrieveUserService = retrieveUserService;
