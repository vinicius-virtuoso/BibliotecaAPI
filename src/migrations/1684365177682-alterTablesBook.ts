import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablesBook1684365177682 implements MigrationInterface {
    name = 'AlterTablesBook1684365177682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "availability" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "availability"`);
    }

}
