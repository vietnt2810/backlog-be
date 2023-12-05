import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/projects.entity';
import { ProjectsService } from '../projects/projects.service';
import { MembersService } from '../members/members.service';
import { UsersService } from '../users/users.service';
import { Member } from '../members/members.entity';
import { User } from '../users/users.entity';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { Issue } from './issues.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Issue, Project, Member, User])],
  controllers: [IssuesController],
  providers: [IssuesService, ProjectsService, MembersService, UsersService],
})
export class IssuesModule {}
