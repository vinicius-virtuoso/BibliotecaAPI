"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBookListSchema = exports.returnBookOneSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
const LanguageEnum = zod_1.z
    .nativeEnum({
    'en-US': 'en-US',
    'pt-BR': 'pt-BR',
    'pt-PT': 'pt-PT',
})
    .default('en-US');
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().max(180).nonempty(),
    synopsis: zod_1.z.string().nonempty(),
    author: zod_1.z.string().max(50).nonempty(),
    pages: zod_1.z.number().min(1),
    language: LanguageEnum,
    date_release: zod_1.z.string().nonempty(),
    quantity_copy: zod_1.z.number().min(1),
});
exports.updateBookSchema = zod_1.z.object({
    title: zod_1.z.string().max(180).nonempty().optional(),
    synopsis: zod_1.z.string().nonempty().optional(),
    author: zod_1.z.string().max(50).nonempty().optional(),
    pages: zod_1.z.number().min(1).optional(),
    language: LanguageEnum.optional(),
    date_release: zod_1.z.string().nonempty().optional(),
    quantity_copy: zod_1.z.number().min(1).optional(),
});
exports.returnBookOneSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    synopsis: zod_1.z.string(),
    author: zod_1.z.string(),
    pages: zod_1.z.number(),
    language: zod_1.z.string(),
    date_release: zod_1.z.string().or(zod_1.z.date()),
    availability: zod_1.z.boolean(),
    copy: zod_1.z.object({
        id: zod_1.z.string(),
        quantity: zod_1.z.number(),
        created_at: zod_1.z.string().or(zod_1.z.date()),
    }),
    count_followers: zod_1.z.number(),
    followers: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        username: zod_1.z.string(),
    })),
});
exports.returnBookListSchema = zod_1.z.array(exports.returnBookOneSchema);
