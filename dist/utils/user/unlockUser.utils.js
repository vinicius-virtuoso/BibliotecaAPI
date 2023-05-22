"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlockUser = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const unlockUser = async () => {
    const currentDate = new Date();
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const usersFind = await userRepo.find({
        where: {
            date_unlock: (0, typeorm_1.LessThanOrEqual)(currentDate.toLocaleString('en-US')),
        },
    });
    if (usersFind.length > 0) {
        usersFind.forEach(async (user) => {
            const userFind = await userRepo.findOneBy({ id: user.id });
            const userUnlock = userRepo.create({
                ...userFind,
                date_unlock: null,
            });
            await userRepo.save(userUnlock);
        });
    }
};
exports.unlockUser = unlockUser;
