"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnLoanListSchema = exports.returnLoanSchema = exports.createLoanSchema = void 0;
const zod_1 = require("zod");
exports.createLoanSchema = zod_1.z.object({
    user: zod_1.z.string().nonempty(),
    copy: zod_1.z.string().nonempty(),
});
exports.returnLoanSchema = zod_1.z.object({
    id: zod_1.z.string(),
    created_at: zod_1.z.string().or(zod_1.z.date()),
    devolution_at: zod_1.z.string().or(zod_1.z.date()),
    user: zod_1.z.object({
        id: zod_1.z.string(),
        username: zod_1.z.string(),
    }),
    copy: zod_1.z.object({
        id: zod_1.z.string(),
        quantity: zod_1.z.number(),
        book: zod_1.z.object({
            id: zod_1.z.string(),
            title: zod_1.z.string(),
        }),
    }),
});
exports.returnLoanListSchema = zod_1.z.array(zod_1.z.object({
    id: zod_1.z.string(),
    created_at: zod_1.z.string(),
    devolution_at: zod_1.z.string(),
    user: zod_1.z.object({
        id: zod_1.z.string(),
        username: zod_1.z.string(),
    }),
    copy: zod_1.z.object({
        id: zod_1.z.string(),
        quantity: zod_1.z.number(),
        book: zod_1.z.object({
            id: zod_1.z.string(),
            title: zod_1.z.string(),
        }),
    }),
}));
