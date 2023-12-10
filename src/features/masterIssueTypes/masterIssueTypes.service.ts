import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterIssueType } from './masterIssueTypes.entity';
import { CreateMasterIssueTypeDto } from './dtos/createMasterIssueType.dto';

@Injectable()
export class MasterIssueTypesService {
  constructor(
    @InjectRepository(MasterIssueType)
    private masterIssueTypeRepository: Repository<MasterIssueType>,
  ) {}

  async createMasterIssueType(
    createMasterIssueTypeRequestBody: CreateMasterIssueTypeDto,
  ) {
    const masterIssueType = await this.masterIssueTypeRepository.findOneBy({
      projectId: createMasterIssueTypeRequestBody.projectId,
      issueType: createMasterIssueTypeRequestBody.issueType,
    });

    if (masterIssueType) {
      throw new BadRequestException('This type is already added');
    }

    return await this.masterIssueTypeRepository.save(
      createMasterIssueTypeRequestBody,
    );
  }

  async getMasterIssueTypes(projectId: number) {
    return await this.masterIssueTypeRepository.find({
      where: [{ isCommon: true }, { projectId }],
      select: {
        id: true,
        issueType: true,
      },
    });
  }
}
