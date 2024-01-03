import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubProject } from '../subProjects/subProjects.entity';
import { MasterIssueType } from '../masterIssueTypes/masterIssueTypes.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyId: number;

  @Column()
  issueKey: string;

  @Column()
  issueTypeId: number;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column({ nullable: true })
  assigneeId: number;

  @Column()
  priority: number;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  dueDate: string;

  @Column({ nullable: true })
  estimatedHour: string;

  @Column({ nullable: true })
  actualHour: string;

  @Column()
  creatorId: number;

  @Column()
  subProjectId: number;

  @Column({ type: 'json', default: null })
  attachedFile: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @ManyToOne(() => SubProject, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subProject: SubProject;

  @ManyToOne(() => MasterIssueType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  issueType: MasterIssueType;
}
