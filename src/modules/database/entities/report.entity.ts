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
import User from './user.entity';
import ReportType from './report-type.entity';
import Dashboard from './dashboard.entity';
import ReportItem from './report-item.entity';

@Entity()
export default class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ type: 'int', nullable: false, default: 330 })
  width: number;

  @Column({ type: 'int', nullable: false, default: 210 })
  height: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  position_x: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  position_y: number;

  @Column({ type: 'int', nullable: false })
  dashboard_id: number;

  @ManyToOne(type => Dashboard, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'dashboard_id'})
  dashboard: Dashboard;

  @Column({ type: 'number', nullable: false })
  user_id: number;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column()
  report_type_id: number;

  @ManyToOne(type => ReportType)
  @JoinColumn({name: 'report_type_id'})
  report_type: ReportType;

  @OneToMany(type => ReportItem, report => report.report)
  report_items: ReportItem[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
