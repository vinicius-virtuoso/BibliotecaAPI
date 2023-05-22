"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnUsersListSchema = exports.returnUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email().max(170).nonempty(),
    password: zod_1.z.string().max(50).min(4).nonempty(),
    is_staff: zod_1.z.boolean().default(false),
});
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().max(170).nonempty().optional(),
    password: zod_1.z.string().max(50).min(4).nonempty().optional(),
});
exports.returnUserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    is_staff: zod_1.z.boolean(),
    is_blocked_loans: zod_1.z.boolean(),
    date_unlock: zod_1.z.string().nullable(),
});
exports.returnUsersListSchema = zod_1.z.array(zod_1.z.object({
    id: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    is_staff: zod_1.z.boolean(),
    is_blocked_loans: zod_1.z.boolean(),
    date_unlock: zod_1.z.string().nullable(),
}));
