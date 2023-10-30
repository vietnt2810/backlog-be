import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(signInRequestBody: SignInDto) {
    const user = await this.usersService.findOneByEmail(
      signInRequestBody.email,
    );

    if (!user || user?.password !== signInRequestBody.password) {
      throw new BadRequestException();
    }

    const payload = { sub: user.id, username: user.email };

    return {
      data: {
        accessToken: await this.jwtService.signAsync(payload),
        username: user.email,
        userId: user.id,
      },
    };
  }

  async signUp(signUpRequestBody: SignUpDto) {
    const user = await this.usersService.findOneByEmail(
      signUpRequestBody.email,
    );

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already existed',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      this.userRepository.save(signUpRequestBody);
    }
  }
}
