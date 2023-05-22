import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateTables1684797022161 implements MigrationInterface {
    name = 'CrateTables1684797022161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "bookId" uuid, CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" date NOT NULL DEFAULT now(), "devolution_at" date, "userId" uuid, "copyId" uuid, CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "copys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "bookId" uuid, CONSTRAINT "PK_b04ec7921d0fa12ac911600531a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(180) NOT NULL, "synopsis" text, "author" character varying(50) NOT NULL, "pages" integer NOT NULL, "language" "public"."books_language_enum" NOT NULL DEFAULT 'en-US', "date_release" date NOT NULL, "availability" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_3cd818eaf734a9d8814843f1197" UNIQUE ("title"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "email" character varying(170) NOT NULL, "password" character varying(150) NOT NULL, "is_staff" boolean NOT NULL DEFAULT false, "is_blocked_loans" boolean NOT NULL DEFAULT false, "date_unlock" date, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_d2e4bf20c4f674105f2e786d77a" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_4c2ab4e556520045a2285916d45" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_c75c2327ce6368e9c120a5326cd" FOREIGN KEY ("copyId") REFERENCES "copys"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "copys" ADD CONSTRAINT "FK_c75fdf558d38802fbf7888cb364" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "copys" DROP CONSTRAINT "FK_c75fdf558d38802fbf7888cb364"`);
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_c75c2327ce6368e9c120a5326cd"`);
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_4c2ab4e556520045a2285916d45"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_d2e4bf20c4f674105f2e786d77a"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_d052aca09cecd2e9b8b94e3c671"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "copys"`);
        await queryRunner.query(`DROP TABLE "loans"`);
        await queryRunner.query(`DROP TABLE "followers"`);
    }

}
