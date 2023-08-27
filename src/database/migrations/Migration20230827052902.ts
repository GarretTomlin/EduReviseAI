import { Migration } from '@mikro-orm/migrations';

export class Migration20230827052902 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "question_bank" add column "type" text not null;');

    this.addSql('alter table "question" drop column "subject";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "question_bank" drop column "type";');

    this.addSql('alter table "question" add column "subject" text not null;');
  }

}
