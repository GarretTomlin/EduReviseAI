import { Migration } from '@mikro-orm/migrations';

export class Migration20230823201518 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "question_bank" ("id" serial primary key, "name" varchar(255) not null, "category" varchar(255) not null, "difficulty" int not null);',
    );

    this.addSql(
      'create table "question" ("id" serial primary key, "text" varchar(255) not null, "author_id" int not null, "question_bank_id" int not null);',
    );

    this.addSql(
      'alter table "question" add constraint "question_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "question" add constraint "question_question_bank_id_foreign" foreign key ("question_bank_id") references "question_bank" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "question" drop constraint "question_question_bank_id_foreign";',
    );

    this.addSql('drop table if exists "question_bank" cascade;');

    this.addSql('drop table if exists "question" cascade;');
  }
}
