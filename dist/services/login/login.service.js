"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const data_source_1 = require("../../data-source");
const bcryptjs_1 = require("bcryptjs");
const errors_1 = require("../../errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const entities_1 = require("../../entities");
const schemas_1 = require("../../schemas");
const loginService = async (payload) => {
    const { username_or_email, password } = payload;
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const userFind = await userRepo.findOne({
        where: [{ email: username_or_email }, { username: username_or_email }],
    });
    if (!userFind) {
        throw new errors_1.AppError('Invalid credentials', 401);
    }
    const comparePassword = await (0, bcryptjs_1.compare)(password, userFind.password);
    if (!comparePassword) {
        throw new errors_1.AppError('Invalid credentials', 401);
    }
    const accessToken = (0, jsonwebtoken_1.sign)({ username_or_email: username_or_email, is_staff: userFind.is_staff }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN,
        subject: String(userFind.id),
    });
    return schemas_1.returnLoginSchema.parse({ accessToken });
};
exports.loginService = loginService;
