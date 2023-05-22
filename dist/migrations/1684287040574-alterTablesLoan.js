"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTablesLoan1684287040574 = void 0;
class AlterTablesLoan1684287040574 {
    constructor() {
        this.name = 'AlterTablesLoan1684287040574';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "loans" RENAME COLUMN "date_loan_at" TO "created_at"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "loans" RENAME COLUMN "created_at" TO "date_loan_at"`);
    }
}
exports.AlterTablesLoan1684287040574 = AlterTablesLoan1684287040574;
