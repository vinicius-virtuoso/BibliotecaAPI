"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTablesBook1684365177682 = void 0;
class AlterTablesBook1684365177682 {
    constructor() {
        this.name = 'AlterTablesBook1684365177682';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" ADD "availability" boolean NOT NULL DEFAULT true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "availability"`);
    }
}
exports.AlterTablesBook1684365177682 = AlterTablesBook1684365177682;
