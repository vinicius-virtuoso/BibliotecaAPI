import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablesLoan1684287040574 implements MigrationInterface {
    name = 'AlterTablesLoan1684287040574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" RENAME COLUMN "date_loan_at" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" RENAME COLUMN "created_at" TO "date_loan_at"`);
    }

}
