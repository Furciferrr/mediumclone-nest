import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1642862919897 implements MigrationInterface {
  name = 'CreateUsers1642862919897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "image" DROP DEFAULT`,
    );
  }
}
