"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockedUserLoan = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const typeorm_1 = require("typeorm");
const sendEmailLoan_utils_1 = require("./sendEmailLoan.utils");
const blockedUserLoan = async () => {
    const currentDate = new Date();
    const loanRepo = data_source_1.AppDataSource.getRepository(entities_1.Loan);
    const loanList = await loanRepo.find({
        where: {
            devolution_at: (0, typeorm_1.LessThan)(currentDate.toLocaleString('en-US')),
        },
        select: ['user'],
        relations: {
            user: true,
        },
    });
    if (loanList.length > 0) {
        const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
        loanList.forEach(async (loan) => {
            const userFind = await userRepo.findOneBy({ id: loan.user.id });
            const userToBlock = userRepo.create({
                ...userFind,
                is_blocked_loans: true,
            });
            await userRepo.save(userToBlock);
            if (userFind) {
                const user = { username: userFind?.username, to: userFind?.email };
                await (0, sendEmailLoan_utils_1.sendEmailLoan)(user);
            }
        });
    }
    return loanList;
};
exports.blockedUserLoan = blockedUserLoan;
