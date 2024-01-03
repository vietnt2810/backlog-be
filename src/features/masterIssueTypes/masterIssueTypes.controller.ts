import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MasterIssueTypesService } from './masterIssueTypes.service';
import { CreateMasterIssueTypeDto } from './dtos/createMasterIssueType.dto';
import { UpdateMasterIssueTypeDto } from './dtos/updateMasterIssueType.dto';

@Controller('master-issues')
export class MasterIssueTypesController {
  constructor(
    private readonly masterIssueTypesService: MasterIssueTypesService,
  ) {}

  @Post()
  createMasterIssueType(
    @Body() createMasterIssueTypeRequestBody: CreateMasterIssueTypeDto,
  ) {
    return this.masterIssueTypesService.createMasterIssueType(
      createMasterIssueTypeRequestBody,
    );
  }

  @Get('projects/:projectId')
  getMasterIssueTypes(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.masterIssueTypesService.getMasterIssueTypes(projectId);
  }

  @Get(':issueTypeId')
  getMasterIssueType(@Param('issueTypeId', ParseIntPipe) issueTypeId: number) {
    return this.masterIssueTypesService.getMasterIssueType(issueTypeId);
  }

  @Put(':issueTypeId')
  updateMasterIssueType(
    @Body() updateMasterIssueTypeRequestBody: UpdateMasterIssueTypeDto,

    @Param('issueTypeId', ParseIntPipe) issueTypeId: number,
  ) {
    return this.masterIssueTypesService.updateMasterIssueType(
      issueTypeId,
      updateMasterIssueTypeRequestBody,
    );
  }

  @Delete(':issueTypeId')
  deleteMasterIssueType(
    @Param('issueTypeId', ParseIntPipe) issueTypeId: number,
  ) {
    return this.masterIssueTypesService.deleteMasterIssueType(issueTypeId);
  }
}
