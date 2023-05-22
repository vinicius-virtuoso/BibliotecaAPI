"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const schemas_1 = require("../../schemas");
const updateUserService = async (user_id, payload) => {
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const userFind = await userRepo.findOneBy({ id: user_id });
    const updatedUser = userRepo.create({
        ...userFind,
        ...payload,
    });
    const savedUpdatedUser = await userRepo.save(updatedUser);
    return schemas_1.returnUserSchema.parse(savedUpdatedUser);
};
exports.updateUserService = updateUserService;
