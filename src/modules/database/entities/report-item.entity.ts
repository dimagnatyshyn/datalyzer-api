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
import Report from './report.entity';
import DataModelItemField from './data-model-item-field.entity';

@Entity()
export default class ReportItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: true})
  name: string;

  @Column({ type: 'number', nullable: false })
  report_id: number;

  @ManyToOne(type => Report, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'report_id'})
  report: Report;

  @Column({ type: 'number', nullable: false })
  model_item_field_id: number;

  @ManyToOne(type => DataModelItemField, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'model_item_field_id'})
  model_item_field: DataModelItemField;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
