import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubProject } from '../subProjects/subProjects.entity';
import { User } from '../users/users.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column()
  assigneeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  subProjectId: number;

  @ManyToOne(() => SubProject)
  @JoinColumn()
  subProject: SubProject;
}
