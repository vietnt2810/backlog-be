import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/projects.entity';
import { ProjectsService } from '../projects/projects.service';
import { MembersService } from '../members/members.service';
import { UsersService } from '../users/users.service';
import { Member } from '../members/members.entity';
import { User } from '../users/users.entity';
import { MasterIssueTypesController } from './masterIssueTypes.controller';
import { MasterIssueTypesService } from './masterIssueTypes.service';
import { MasterIssueType } from './masterIssueTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterIssueType, Project, Member, User])],
  controllers: [MasterIssueTypesController],
  providers: [
    MasterIssueTypesService,
    ProjectsService,
    MembersService,
    UsersService,
  ],
})
export class MasterIssueTypesModule {}
