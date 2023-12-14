import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueUpdate } from '../issueUpdates/issueUpdate.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(IssueUpdate)
    private issueUpdateRepository: Repository<IssueUpdate>,
  ) {}

  async 
}
