import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablesUsers1684443189077 implements MigrationInterface {
    name = 'AlterTablesUsers1684443189077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(50) NOT NULL`);
    }

}
