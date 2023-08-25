import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared/exceptions/database.exception';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MailerModule,
    UsersModule,
    QuestionsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
