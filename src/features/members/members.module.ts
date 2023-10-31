import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './members.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, User])],
  providers: [MembersService, UsersService],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
