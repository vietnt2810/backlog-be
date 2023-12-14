import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';
import { MembersService } from '../members/members.service';
import { UsersService } from '../users/users.service';
import { Member } from '../members/members.entity';
import { User } from '../users/users.entity';
import { IssuesService } from '../issues/issues.service';
import { Issue } from '../issues/issues.entity';
import { SubProject } from '../subProjects/subProjects.entity';
import { SubProjectsService } from '../subProjects/subProjects.service';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';

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
  controllers: [ProjectsController],
  providers: [
    IssuesService,
    SubProjectsService,
    ProjectsService,
    MembersService,
    UsersService,
  ],
})
export class ProjectsModule {}
