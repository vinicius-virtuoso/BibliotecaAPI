"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnLoginSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username_or_email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.returnLoginSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
