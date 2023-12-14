import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubProject } from '../subProjects/subProjects.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyId: number;

  @Column()
  issueKey: string;

  @Column()
  type: number;

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
  estimatedHour: number;

  @Column({ nullable: true })
  actualHour: number;

  @Column()
  createdByUserId: number;

  @Column()
  subProjectId: number;

  @ManyToOne(() => SubProject, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subProject: SubProject;
}
