export type DatabaseType = 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'oracle' | 'mssql' | 'mongodb';

export interface ConnectionData {
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  type: DatabaseType;
  database: string;
}

export enum ConnectionErrorMessage {
  NAME_IS_NOT_UNIQ = 'Connection with such a name already exists',
  CANNOT_ESTABLISH_CONNECTION = 'Database is not reachable',
  DATABASE_TYPE_DOES_NOT_EXISTS = 'Database type does not exists',
  CONNECTION_DOES_NOT_EXISTS = 'Connection with such an id does not exists',
}

export interface ColumnDescriptor {
  name: string;
  isNumeric: boolean;
}

export interface TableAndColumnQueryResult {
  table: string;
  column: string;
  type: string;
}

export interface FormattedTableAndColumnQueryResult {
  tableName: string;
  columns: ColumnDescriptor[];
}
export interface GroupedTableAndColumnQueryResult {
  [key: string]: ColumnDescriptor[];
}

export interface RelationsQueryResult {
  foreign_table: string;
  fk_column: string;
  primary_table: string;
  pk_column: string;
}

export interface FormattedRelationQueryResult {
  foreignTable: string;
  fkColumn: string;
  primaryTable: string;
  pkColumn: string;
}
