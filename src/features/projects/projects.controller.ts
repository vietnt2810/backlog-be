import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MembersService } from '../members/members.service';
import { AddMemberDto } from '../members/dtos/addMember.dto';
import { CreateEditProjectDto } from './dtos/createProject.dto';
import { ChangeMemberNameDto } from '../members/dtos/changeMemberName.dto';
import { IssuesService } from '../issues/issues.service';
import {
  GetMembersQueryParams,
  GetProjectIssuesQueryParams,
} from './types/projects.types';
import { SubProjectsService } from '../subProjects/subProjects.service';
import { CreateAndEditSubProjectDto } from '../subProjects/dtos/createAndEditSubProjectDto.dto';
import { IssueUpdatesService } from '../issueUpdates/issueUpdate.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ViewHistoryService } from '../viewHistory/viewHistory.service';
import { UpdateRecentlyViewedIssuesDto } from './dtos/updateRecentlyViewedIssues.dto';
import { ChangeMemberRoleDto } from '../members/dtos/changeMemberRole.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly membersService: MembersService,
    private readonly issuesService: IssuesService,
    private readonly subProjectsService: SubProjectsService,
    private readonly issueUpdatesService: IssueUpdatesService,
    private readonly notificationsService: NotificationsService,
    private readonly viewHistoryService: ViewHistoryService,
  ) {}

  @Post()
  createProject(@Body() createProjectRequestBody: CreateEditProjectDto) {
    return this.projectsService.createProject(createProjectRequestBody);
  }

  @Put(':projectId')
  editProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() editProjectRequestBody: CreateEditProjectDto,
  ) {
    return this.projectsService.editProject(projectId, editProjectRequestBody);
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectsService.deleteProject(projectId);
  }

  @Get(':projectId/members')
  getMembers(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query() getMembersQueryParams: GetMembersQueryParams,
  ) {
    return this.membersService.getMembers(projectId, getMembersQueryParams);
  }

  @Get(':projectId/members/:memberId')
  getMemberDetail(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.membersService.getMemberDetail(projectId, memberId);
  }

  @Post(':projectId/add-member')
  addMember(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() addMemberRequestBody: AddMemberDto,
  ) {
    return this.membersService.addMember({
      ...addMemberRequestBody,
      projectId,
    });
  }

  @Put(':projectId/members/:memberId')
  changeMemberNameInProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() changeMemberNameRequestBody: ChangeMemberNameDto,
  ) {
    return this.membersService.changeMemberNameInProject(
      projectId,
      memberId,
      changeMemberNameRequestBody,
    );
  }

  @Put(':projectId/members/:memberId/change-role')
  changeMemberRole(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() changeMemberRoleRequestBody: ChangeMemberRoleDto,
  ) {
    return this.membersService.changeMemberRole(
      projectId,
      memberId,
      changeMemberRoleRequestBody,
    );
  }

  @Put(':projectId/members/:memberId/delete-member')
  deleteMember(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.membersService.deleteMember(projectId, memberId);
  }

  @Post(':projectId/sub-projects')
  createSubProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createSubProjectRequestBody: CreateAndEditSubProjectDto,
  ) {
    return this.subProjectsService.createSubProject(
      projectId,
      createSubProjectRequestBody,
    );
  }

  @Get(':projectId/sub-projects')
  getSubProjects(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.subProjectsService.getSubProjects(projectId);
  }

  @Get(':projectId/recent-updates')
  getProjectRecentUpdates(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.issueUpdatesService.getProjectRecentUpdates(projectId);
  }

  @Get(':projectId/users/:userId/issues')
  getUserProjectIssues(
    @Query() getProjectIssuesQueryParams: GetProjectIssuesQueryParams,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.issuesService.getUserProjectIssues(
      projectId,
      userId,
      getProjectIssuesQueryParams,
    );
  }

  @Get(':projectId/users/:userId/notifications')
  getNotifications(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.notificationsService.getNotifications(projectId, userId);
  }

  @Put('notifications/:notificationId')
  updateReadNotification(
    @Param('notificationId', ParseIntPipe) notificationId: number,
  ) {
    return this.notificationsService.updateReadNotification(notificationId);
  }

  @Get(':projectId/users/:userId/recently-viewed')
  getRecentlyViewedIssues(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.viewHistoryService.getRecentlyViewedIssues(projectId, userId);
  }

  @Put(':projectId/users/:userId/recently-viewed')
  updateRecentlyViewedIssues(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body()
    updateRecentlyViewedIssuesRequestBody: UpdateRecentlyViewedIssuesDto,
  ) {
    return this.viewHistoryService.updateRecentlyViewedIssues(
      projectId,
      userId,
      updateRecentlyViewedIssuesRequestBody,
    );
  }
}
