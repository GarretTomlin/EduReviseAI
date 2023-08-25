import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/database/entities';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
