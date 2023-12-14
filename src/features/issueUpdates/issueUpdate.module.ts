import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/projects.entity';
import { ProjectsService } from '../projects/projects.service';
import { MembersService } from '../members/members.service';
import { UsersService } from '../users/users.service';
import { Member } from '../members/members.entity';
import { User } from '../users/users.entity';
import { SubProjectsService } from '../subProjects/subProjects.service';
import { SubProject } from '../subProjects/subProjects.entity';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';
import { IssuesService } from '../issues/issues.service';
import { Issue } from '../issues/issues.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IssueUpdate,
      Issue,
      SubProject,
      Project,
      Member,
      User,
    ]),
  ],
  providers: [
    IssuesService,
    SubProjectsService,
    ProjectsService,
    MembersService,
    UsersService,
  ],
})
export class IssueUpdatesModule {}
