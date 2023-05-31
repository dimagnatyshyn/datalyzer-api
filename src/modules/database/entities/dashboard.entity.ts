import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './user.entity';
import Report from './report.entity';

@Entity()
export default class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ type: 'number', nullable: false })
  user_id: number;

  @ManyToOne(type => Users, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id'})
  user: Users;

  @OneToMany(type => Report, report => report.dashboard)
  reports: Report[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
