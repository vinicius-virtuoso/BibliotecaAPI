"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookLanguage = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
var BookLanguage;
(function (BookLanguage) {
    BookLanguage["en_US"] = "en-US";
    BookLanguage["pt_BR"] = "pt-BR";
    BookLanguage["pt_PT"] = "pt-PT";
})(BookLanguage = exports.BookLanguage || (exports.BookLanguage = {}));
let Book = class Book {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 180 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "synopsis", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Book.prototype, "pages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BookLanguage, default: BookLanguage.en_US }),
    __metadata("design:type", String)
], Book.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Book.prototype, "date_release", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Book.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Copy, (copy) => copy.book, { cascade: true }),
    __metadata("design:type", Array)
], Book.prototype, "copy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Follower, (follower) => follower.user, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Book.prototype, "followers", void 0);
Book = __decorate([
    (0, typeorm_1.Entity)('books')
], Book);
exports.Book = Book;
