import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Member } from '../members/members.entity';
import { MembersService } from '../members/members.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Member])],
  providers: [UsersService, MembersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
