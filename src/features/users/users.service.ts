import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      select: ['email', 'username', 'avatarUrl'],
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUserProfile(updateUserProfileRequestBody: UpdateUserProfileDto) {
    this.userRepository.update(
      {
        email: updateUserProfileRequestBody.email,
      },
      { ...updateUserProfileRequestBody },
    );
  }
}
