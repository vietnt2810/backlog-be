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

  @Column()
  subTitle: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Project;
}
