import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MasterIssueTypesService } from './masterIssueTypes.service';
import { CreateMasterIssueTypeDto } from './dtos/createMasterIssueType.dto';

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

  @Get(':projectId')
  getMasterIssueTypes(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.masterIssueTypesService.getMasterIssueTypes(projectId);
  }

  @Delete(':issueTypeId')
  deleteMasterIssueType(
    @Param('issueTypeId', ParseIntPipe) issueTypeId: number,
  ) {
    return this.masterIssueTypesService.deleteMasterIssueType(issueTypeId);
  }
}
