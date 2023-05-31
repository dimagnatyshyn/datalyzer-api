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
export default class DataModelItemRelation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  first_model_item_relation_field: string;

  @Column({ length: 500, nullable: false})
  second_model_item_relation_field: string;

  @Column({ type: 'number', nullable: false })
  first_model_item_id: number;

  @ManyToOne(type => DataModelItem, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'first_model_item_id'})
  first_model_item: DataModelItem;

  @Column({ type: 'number', nullable: false })
  second_model_item_id: number;

  @ManyToOne(type => DataModelItem, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'second_model_item_id'})
  second_model_item: DataModelItem;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
