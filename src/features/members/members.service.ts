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
import { GetMembersQueryParams } from '../projects/types/projects.types';

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

      if (isEmpty(alreadyAddedUser)) {
        await this.memberRepository.save({
          projectId: addMemberRequestBody.projectId,
          userId: user ? user.id : addMemberRequestBody.userId,
          role: addMemberRequestBody.role,
          username: user.username,
        });
      } else if (!isEmpty(alreadyAddedUser) && alreadyAddedUser.isRemoved) {
        await this.memberRepository.update(
          {
            projectId: addMemberRequestBody.projectId,
            userId: user ? user.id : addMemberRequestBody.userId,
          },
          {
            isRemoved: false,
          },
        );
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

  async deleteMember(projectId: number, memberId: number) {
    return await this.memberRepository.update(
      { userId: memberId, projectId },
      { isRemoved: true },
    );
  }

  async getMembers(
    projectId: number,
    getMembersQueryParams?: GetMembersQueryParams,
  ) {
    const data = await this.memberRepository.find({
      where: {
        isRemoved: false,
        projectId,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          avatarUrl: true,
          email: true,
        },
        userId: true,
        username: true,
        role: true,
        joinedDate: true,
      },
    });

    let resultData = data;

    getMembersQueryParams.keyword &&
      (resultData = data.filter((member) =>
        member.username
          .toLowerCase()
          .includes(getMembersQueryParams.keyword.toLowerCase()),
      ));

    getMembersQueryParams.role &&
      (resultData = resultData.filter(
        (member) => member.role === Number(getMembersQueryParams.role),
      ));

    return {
      data: resultData
        .slice(
          ((getMembersQueryParams.page ? getMembersQueryParams.page : 1) - 1) *
            20,
        )
        .slice(
          0,
          getMembersQueryParams.perPage ? getMembersQueryParams.perPage : 20,
        ),
      meta: {
        page: getMembersQueryParams.page ? getMembersQueryParams.page : 1,
        totalRecord: resultData.length,
        totalMember: data.length,
      },
    };
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
        isRemoved: false,
        userId,
      },
      relations: {
        project: true,
      },
    });

    const projects = data.map((item) => {
      return {
        role: item.role,
        project: item.project,
      };
    });

    return projects;
  }

  async getProjectDetail(userId: number, projectId: number) {
    const data = await this.memberRepository.findOne({
      where: {
        userId,
        projectId,
      },
      relations: {
        project: true,
      },
    });

    const projectDetail = {
      username: data.username,
      role: data.role,
      project: {
        id: data.project.id,
        projectName: data.project.projectName,
      },
    };

    return projectDetail;
  }
}
