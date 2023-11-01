import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Project } from '../projects/projects.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @Column()
  role: boolean;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;
}
