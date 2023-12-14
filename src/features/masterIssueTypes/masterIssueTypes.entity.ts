import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../projects/projects.entity';

@Entity()
export class MasterIssueType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueType: string;

  @Column({ default: null, nullable: true })
  projectId: number;

  @Column({ default: false })
  isCommon: boolean;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subProject: Project;
}
