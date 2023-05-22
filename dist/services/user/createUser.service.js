"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const schemas_1 = require("../../schemas");
const createUserService = async (payload) => {
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const userCreate = userRepo.create(payload);
    const savedUser = await userRepo.save(userCreate);
    return schemas_1.returnUserSchema.parse(savedUser);
};
exports.createUserService = createUserService;
