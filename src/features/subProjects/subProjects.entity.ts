import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../projects/projects.entity';

@Entity()
export class SubProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subProjectName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  projectId: number;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;
}
