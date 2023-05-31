import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import Connection from './connection.entity';

@Entity()
export default class ConnectionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  display_name: string;

  @OneToMany(type => Connection, connection => connection.type)
  users: Connection[];
}
