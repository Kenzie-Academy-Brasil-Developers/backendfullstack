import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1675562140227 implements MigrationInterface {
    name = 'createTable1675562140227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "telephone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "telephone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
