import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ConnectionType from './connectionType.entity';
import Users from './user.entity';
import DataModel from './data-model.entity';

@Entity()
export default class Connection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  username: string;

  @Column({ length: 500, nullable: false})
  db_name: string;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ length: 500, nullable: false })
  password: string;

  @Column({ length: 500, nullable: false })
  host: string;

  @Column({ length: 10, nullable: false })
  port: string;

  @Column({ type: 'number', nullable: false })
  admin_id: number;

  @Column({ type: 'number', nullable: false })
  type_id: number;

  @ManyToOne(type => ConnectionType)
  @JoinColumn({name: 'type_id'})
  type: ConnectionType;

  @ManyToOne(type => Users, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'admin_id'})
  admin: ConnectionType;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
