import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Public } from '../auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }
}
