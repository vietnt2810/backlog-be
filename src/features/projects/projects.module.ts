import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';
import { MembersService } from '../members/members.service';
import { UsersService } from '../users/users.service';
import { Member } from '../members/members.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Member, User])],
  controllers: [ProjectsController],
  providers: [ProjectsService, MembersService, UsersService],
})
export class ProjectsModule {}
