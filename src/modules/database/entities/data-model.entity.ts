import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable, ManyToMany,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import Connection from './connection.entity';
import DataModelItem from './data-model-item.entity';

@Entity()
export default class DataModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ type: 'number', nullable: false })
  admin_id: number;

  @Column({ type: 'number', nullable: false })
  db_connection_id: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  active: boolean;

  @ManyToOne(type => Connection, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'db_connection_id'})
  db_connection: Connection;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'admin_id'})
  admin: User;

  @OneToMany(type => DataModelItem, item => item.model)
  modelItems: DataModelItem[];

  @ManyToMany(type => User, user => user.data_models, {
    cascade: true,
  })
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
