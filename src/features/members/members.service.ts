import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './members.entity';
import { Repository } from 'typeorm';
import { AddMemberDto } from './dtos/addMember.dto';
import { UsersService } from '../users/users.service';
import { isEmpty } from 'lodash';
import { ChangeMemberNameDto } from './dtos/changeMemberName.dto';

@Injectable()
export class MembersService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async addMember(addMemberRequestBody: AddMemberDto) {
    if (addMemberRequestBody.userId) {
      // Add the first person to project
      const user = await this.usersService.findOne(addMemberRequestBody.userId);

      if (isEmpty(user)) {
        throw new NotFoundException('Something occurred, user does not exist');
      }

      await this.memberRepository.save({
        ...addMemberRequestBody,
        username: user.username,
      });
    } else {
      // Add new member to project
      const user = await this.usersService.findOneByEmail(
        addMemberRequestBody.email,
      );

      if (isEmpty(user)) {
        throw new NotFoundException('User does not exist');
      }

      const alreadyAddedUser = await this.memberRepository.findOne({
        where: { userId: user.id, projectId: addMemberRequestBody.projectId },
      });

      if (await isEmpty(alreadyAddedUser)) {
        await this.memberRepository.save({
          projectId: addMemberRequestBody.projectId,
          userId: user ? user.id : addMemberRequestBody.userId,
          role: addMemberRequestBody.role,
          username: user.username,
        });
      } else {
        throw new BadRequestException('User is already added');
      }
    }
  }

  async changeMemberNameInProject(
    projectId: number,
    memberId: number,
    changeMemberNameRequestBody: ChangeMemberNameDto,
  ) {
    const member = await this.memberRepository.findOne({
      where: { userId: memberId, projectId },
    });

    if (!member) throw new NotFoundException('User does not exist');

    this.memberRepository.update(
      { userId: memberId, projectId },
      { username: changeMemberNameRequestBody.memberName },
    );
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

  async getMemberDetail(projectId: number, memberId: number) {
    return await this.memberRepository.findOne({
      where: { projectId, userId: memberId },
      select: {
        username: true,
        role: true,
      },
    });
  }

  async getProjects(userId: number) {
    const data = await this.memberRepository.find({
      where: {
        userId,
      },
      relations: {
        project: true,
      },
    });

    const projects = data.map((item) => {
      return item.project;
    });

    return projects;
  }
}
