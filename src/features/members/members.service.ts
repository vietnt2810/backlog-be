import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './members.entity';
import { Repository } from 'typeorm';
import { AddMemberDto } from './dtos/addMember.dto';
import { UsersService } from '../users/users.service';
import { isEmpty } from 'lodash';

@Injectable()
export class MembersService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async addMember(addMemberRequestBody: AddMemberDto) {
    if (addMemberRequestBody.userId) {
      await this.memberRepository.save(addMemberRequestBody);
    } else {
      const user = await this.usersService.findOneByEmail(
        addMemberRequestBody.email,
      );
      if (isEmpty(user)) {
        throw new BadRequestException('User does not exist');
      }

      const alreadyAddedUser = await this.memberRepository.findOne({
        where: { userId: user.id, projectId: addMemberRequestBody.projectId },
      });

      if (await isEmpty(alreadyAddedUser)) {
        await this.memberRepository.save({
          projectId: addMemberRequestBody.projectId,
          userId: user ? user.id : addMemberRequestBody.userId,
          role: addMemberRequestBody.role,
        });
      } else {
        throw new BadRequestException('User is already added');
      }
    }
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
