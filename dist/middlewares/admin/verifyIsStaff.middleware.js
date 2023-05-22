"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIsStaff = void 0;
const errors_1 = require("../../errors");
const verifyIsStaff = async (req, res, next) => {
    const { is_staff } = req.auth;
    if (!is_staff) {
        throw new errors_1.AppError('Insufficient permission.', 403);
    }
    return next();
};
exports.verifyIsStaff = verifyIsStaff;
