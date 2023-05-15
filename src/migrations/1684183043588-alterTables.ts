import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1684183043588 implements MigrationInterface {
    name = 'AlterTables1684183043588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "copys" DROP CONSTRAINT "FK_c75fdf558d38802fbf7888cb364"`);
        await queryRunner.query(`ALTER TABLE "copys" ADD CONSTRAINT "FK_c75fdf558d38802fbf7888cb364" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "copys" DROP CONSTRAINT "FK_c75fdf558d38802fbf7888cb364"`);
        await queryRunner.query(`ALTER TABLE "copys" ADD CONSTRAINT "FK_c75fdf558d38802fbf7888cb364" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
