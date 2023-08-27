import { Migration } from '@mikro-orm/migrations';

export class Migration20230827132938 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "question_bank" ("id" serial primary key, "name" varchar(255) not null, "category" varchar(255) not null, "difficulty" int not null);',
    );

    this.addSql(
      'create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "email" text not null default \'example@gmail.com\', "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );

    this.addSql(
      'create table "question" ("id" serial primary key, "message" varchar(255) not null, "author_id" int not null, "question_bank_id" int not null);',
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

    this.addSql(
      'alter table "question" drop constraint "question_author_id_foreign";',
    );

    this.addSql('drop table if exists "question_bank" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "question" cascade;');
  }
}
