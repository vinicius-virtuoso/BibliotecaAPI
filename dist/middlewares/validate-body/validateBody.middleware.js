"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => async (req, res, next) => {
    const validation = schema.parse(req.body);
    req.body = validation;
    return next();
};
exports.validateBody = validateBody;
