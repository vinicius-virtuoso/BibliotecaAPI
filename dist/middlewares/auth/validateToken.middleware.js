"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const validateToken = async (req, res, next) => {
    const authToken = req.headers.authorization;
    const token = authToken?.split(' ')[1];
    if (!token) {
        throw new errors_1.AppError('Missing bearer token.', 401);
    }
    jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
        if (err) {
            throw new errors_1.AppError(err.message, 401);
        }
        req.auth = {
            id: decoded.sub,
            is_staff: decoded.is_staff,
        };
        return next();
    });
};
exports.validateToken = validateToken;
