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
exports.Loan = void 0;
const __1 = require("..");
const typeorm_1 = require("typeorm");
let Loan = class Loan {
    date_devolution() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        let devolution = new Date(date.setDate(date.getDate() + 3));
        if (devolution.getDay() === 6) {
            devolution = new Date(devolution.setDate(date.getDate() + 2));
        }
        else if (devolution.getDay() === 0) {
            devolution = new Date(devolution.setDate(date.getDate() + 3));
        }
        devolution.setHours(0, 0, 0, 0);
        this.devolution_at = devolution.toISOString().split('T')[0];
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Loan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date' }),
    __metadata("design:type", Object)
], Loan.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Loan.prototype, "devolution_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Loan.prototype, "date_devolution", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.User, (user) => user.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", __1.User)
], Loan.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => __1.Copy, (copy) => copy.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", __1.Copy)
], Loan.prototype, "copy", void 0);
Loan = __decorate([
    (0, typeorm_1.Entity)('loans')
], Loan);
exports.Loan = Loan;
