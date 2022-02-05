import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1642617923896 implements MigrationInterface {
  name = 'SeedDb1642617923896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    await queryRunner.query(
      // password is 123456
      `INSERT INTO users (username, email, password) VALUES ('Sema', 'sema@mail.ru', '$2b$10$pm.gukliXTANXj4mWVnIYupcCqqKt4Jz2sqWUi.nzYIyrPe4r3Tbm')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article description', 'First article body', 'coffee,dragons', 1), ('second-article', 'Second article', 'Second article description', 'Second article body', 'coffee,dragons', 1)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
