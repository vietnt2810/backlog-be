import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Public } from '../auth/guard/auth.guard';
import { MembersService } from '../members/members.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly membersService: MembersService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Public()
  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get(':userId/projects')
  getProjects(@Param('userId', ParseIntPipe) userId: number) {
    return this.membersService.getProjects(userId);
  }
}
