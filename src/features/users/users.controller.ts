import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Public } from '../auth/guard/auth.guard';
import { MembersService } from '../members/members.service';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly membersService: MembersService,
  ) {}

  @Get(':userId')
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Put()
  updateUserProfile(
    @Body() updateUserProfileRequestBody: UpdateUserProfileDto,
  ) {
    return this.userService.updateUserProfile(updateUserProfileRequestBody);
  }

  @Get(':userId/projects')
  getProjects(@Param('userId', ParseIntPipe) userId: number) {
    return this.membersService.getProjects(userId);
  }

  @Get(':userId/projects/:projectId')
  getProjectDetail(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.membersService.getProjectDetail(userId, projectId);
  }
}
