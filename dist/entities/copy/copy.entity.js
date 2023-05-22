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
exports.Copy = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
let Copy = class Copy {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Copy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Copy.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Copy.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Book, (book) => book.copy, { onDelete: 'CASCADE' }),
    __metadata("design:type", __1.Book)
], Copy.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => __1.Loan, (loan) => loan.copy, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Copy.prototype, "loans", void 0);
Copy = __decorate([
    (0, typeorm_1.Entity)('copys')
], Copy);
exports.Copy = Copy;
