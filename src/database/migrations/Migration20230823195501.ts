import { Migration } from '@mikro-orm/migrations';

export class Migration20230823195501 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );

    this.addSql('drop table if exists "migrations" cascade;');

    this.addSql('drop table if exists "quiz_items" cascade;');

    this.addSql('drop table if exists "quizzes" cascade;');
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "migrations" ("id" serial, "timestamp" int8 not null default null, "name" varchar not null default null, constraint "PK_8c82d7f526340ab734260ea46be" primary key ("id"));',
    );

    this.addSql(
      'create table "quiz_items" ("id" uuid not null default uuid_generate_v4(), "parent_question_id" varchar null default null, "quiz_id" uuid null default null, "item_type" int4 not null default null, "user_id" int4 not null default null, "question_type" int4 not null default null, "instruction" varchar null default null, "content" varchar null default null, "title" varchar null default null, "choices" json null default null, "accepted_answers" json null default null, "weight" varchar null default null, "hint" varchar not null default null, "explanation" varchar null default null, "level" int4 not null default null, "difficulty" float8 not null default null, "validation_type" int4 not null default null, "multi_answers_allowed" bool null default null, "equation_questions" json null default null, "equation_header" varchar null default null, "answer_columns" json null default null, "order" int4 not null default null, "points" int4 not null default 0, "can_show_working" bool not null default null, "created_at" timestamp not null default now(), "updated_at" timestamp not null default now(), constraint "PK_b9c6931f1a8409a891c05b683d2" primary key ("id"));',
    );

    this.addSql(
      'create table "quizzes" ("id" uuid not null default uuid_generate_v4(), "name" varchar not null default null, "user_id" int4 not null default null, "created_at" timestamp not null default now(), "updated_at" timestamp not null default now(), constraint "PK_b24f0f7662cf6b3a0e7dba0a1b4" primary key ("id"));',
    );

    this.addSql('drop table if exists "user" cascade;');
  }
}
