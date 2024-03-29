import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './features/auth/auth.module';
import { User } from './features/users/users.entity';
import { ProjectsModule } from './features/projects/projects.module';
import { Member } from './features/members/members.entity';
import { Project } from './features/projects/projects.entity';
import { MembersModule } from './features/members/members.module';
import { SubProjectsModule } from './features/subProjects/subProjects.module';
import { SubProject } from './features/subProjects/subProjects.entity';
import { MasterIssueTypesModule } from './features/masterIssueTypes/masterIssueTypes.module';
import { Issue } from './features/issues/issues.entity';
import { MasterIssueType } from './features/masterIssueTypes/masterIssueTypes.entity';
import { IssuesModule } from './features/issues/issues.module';
import { Notification } from './features/notifications/notifications.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '0.0.0.0',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'backlog',
      entities: [
        User,
        Project,
        Member,
        SubProject,
        Issue,
        MasterIssueType,
        Notification,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    MembersModule,
    SubProjectsModule,
    IssuesModule,
    MasterIssueTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
