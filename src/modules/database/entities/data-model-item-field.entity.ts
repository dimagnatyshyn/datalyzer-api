import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import DataModelItem from './data-model-item.entity';

@Entity()
export default class DataModelItemField extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  original_name: string;

  @Column({ nullable: false})
  type: 'dimension' | 'fact';

  @Column({ length: 500, nullable: false})
  given_name: string;

  @Column({ type: 'number', nullable: false })
  model_item_id: number;

  @ManyToOne(type => DataModelItem, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'model_item_id'})
  model_item: DataModelItem;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
