"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTablesUsers1684443189077 = void 0;
class AlterTablesUsers1684443189077 {
    constructor() {
        this.name = 'AlterTablesUsers1684443189077';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(50) NOT NULL`);
    }
}
exports.AlterTablesUsers1684443189077 = AlterTablesUsers1684443189077;
