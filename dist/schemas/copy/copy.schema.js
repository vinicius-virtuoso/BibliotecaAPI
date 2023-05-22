"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnCopySchema = exports.createCopySchema = void 0;
const zod_1 = require("zod");
const __1 = require("..");
exports.createCopySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(1),
    book: zod_1.z.string(),
});
exports.returnCopySchema = zod_1.z.object({
    id: zod_1.z.string(),
    quantity: zod_1.z.number().min(1),
    created_at: zod_1.z.string(),
    book: __1.returnBookOneSchema,
});
