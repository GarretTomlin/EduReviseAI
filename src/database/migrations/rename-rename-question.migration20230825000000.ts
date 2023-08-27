import { Migration } from '@mikro-orm/migrations';

export class Migration20230825000000 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "question" rename column "text" to "message";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "question" rename column "message" to "text";');
  }
}
