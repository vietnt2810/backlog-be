import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './members.entity';
import { Repository } from 'typeorm';
import { AddMemberDto } from './dtos/addMember.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class MembersService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async addMember(addMemberRequestBody: AddMemberDto) {
    const user = await this.usersService.findOneByEmail(
      addMemberRequestBody.email,
    );

    await this.memberRepository.save({
      projectId: addMemberRequestBody.projectId,
      userId: user ? user.id : addMemberRequestBody.userId,
      role: addMemberRequestBody.role,
    });
  }

  async getMembers(projectId: number) {
    return await this.memberRepository.find({
      where: {
        projectId,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          email: true,
          username: true,
        },
      },
    });
  }
}
