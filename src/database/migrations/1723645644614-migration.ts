import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723645644614 implements MigrationInterface {
  name = 'Migration1723645644614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "code" text NOT NULL, "price" numeric(8,2) NOT NULL, "status" boolean NOT NULL DEFAULT true, "stock" integer NOT NULL, "category" text NOT NULL, "thumbnails" jsonb NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
