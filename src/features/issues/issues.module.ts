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
import { SubProjectsService } from '../subProjects/subProjects.service';
import { SubProject } from '../subProjects/subProjects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, SubProject, Project, Member, User]),
  ],
  controllers: [IssuesController],
  providers: [
    IssuesService,
    SubProjectsService,
    ProjectsService,
    MembersService,
    UsersService,
  ],
})
export class IssuesModule {}
