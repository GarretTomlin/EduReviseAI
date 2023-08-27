import { Migration } from '@mikro-orm/migrations';

export class Migration20230824000000 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" add column "email" varchar not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "email";');
  }
}
