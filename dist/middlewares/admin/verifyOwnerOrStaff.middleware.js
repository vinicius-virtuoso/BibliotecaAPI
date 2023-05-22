"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwnerOrStaff = void 0;
const errors_1 = require("../../errors");
const verifyOwnerOrStaff = async (req, res, next) => {
    const { user_id } = req.params;
    const { is_staff, id: token_id } = req.auth;
    if (user_id !== token_id) {
        if (!is_staff) {
            throw new errors_1.AppError('Insufficient permission.', 403);
        }
    }
    return next();
};
exports.verifyOwnerOrStaff = verifyOwnerOrStaff;
