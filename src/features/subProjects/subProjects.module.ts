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

@Module({
  imports: [TypeOrmModule.forFeature([SubProject, Project, Member, User])],
  controllers: [SubProjectsController],
  providers: [
    SubProjectsService,
    ProjectsService,
    MembersService,
    UsersService,
  ],
})
export class SubProjectsModule {}
