import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() loginRequestBody: SignInDto) {
    return this.authService.signIn(loginRequestBody);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  getProfile(@Body() signUpRequestBody: SignUpDto) {
    return this.authService.signUp(signUpRequestBody);
  }
}
