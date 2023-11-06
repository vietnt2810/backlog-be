import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MembersService } from '../members/members.service';
import { AddMemberDto } from '../members/dtos/addMember.dto';
import { CreateProjectDto } from './dtos/createProject.dto';
import { ChangeMemberNameDto } from '../members/dtos/changeMemberName.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly membersService: MembersService,
  ) {}

  @Post()
  createProject(@Body() createProjectRequestBody: CreateProjectDto) {
    return this.projectsService.createProject(createProjectRequestBody);
  }

  @Get(':projectId/members')
  getMembers(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.membersService.getMembers(projectId);
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

  @Put(':projectId/change-member-name/:memberId')
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
}
