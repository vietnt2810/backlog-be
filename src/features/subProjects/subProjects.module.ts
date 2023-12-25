import { Module } from '@nestjs/common';
import { SubProjectsController } from './subProjects.controller';
import { SubProjectsService } from './subProjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubProject } from './subProjects.entity';
import { Project } from '../projects/projects.entity';
import { ProjectsService } from '../projects/projects.service';
import { MembersService } from '../members/members.service';
import { UsersService } from '../users/users.service';
import { Member } from '../members/members.entity';
import { User } from '../users/users.entity';
import { IssueUpdatesService } from '../issueUpdates/issueUpdate.service';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';
import { Issue } from '../issues/issues.entity';
import { IssuesService } from '../issues/issues.service';
import { Comment } from '../comments/comments.entity';
import { Notification } from '../notifications/notifications.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      Comment,
      IssueUpdate,
      Issue,
      SubProject,
      Project,
      Member,
      User,
    ]),
  ],
  controllers: [SubProjectsController],
  providers: [
    IssueUpdatesService,
    IssuesService,
    SubProjectsService,
    ProjectsService,
    MembersService,
    UsersService,
  ],
})
export class SubProjectsModule {}
