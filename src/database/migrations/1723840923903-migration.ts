import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723840923903 implements MigrationInterface {
  name = 'Migration1723840923903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "code" text NOT NULL, "price" numeric(8,2) NOT NULL, "status" boolean NOT NULL DEFAULT true, "stock" integer NOT NULL, "category" text NOT NULL, "thumbnails" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
