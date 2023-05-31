import {
  FormattedRelationQueryResult,
  FormattedTableAndColumnQueryResult,
  GroupedTableAndColumnQueryResult,
  RelationsQueryResult,
  TableAndColumnQueryResult,
} from '../connections.interfaces';
import { numericTypes } from '../../database/numericTypes';

export const groupColumnsByTables = (data: TableAndColumnQueryResult[]): GroupedTableAndColumnQueryResult =>
  data.reduce((acc, { column: name, table, type }) => {
    const columnData = {
      name,
      isNumeric: numericTypes.postgres.includes(type),
    };
    if (acc[table]) {
      acc[table].push(columnData);
    } else {
      acc[table] = [columnData];
    }
    return acc;
  }, {});

export const formatTablesAndColumnsResponse = (
  data: TableAndColumnQueryResult[],
): FormattedTableAndColumnQueryResult[] => {
  const groupedData = groupColumnsByTables(data);
  return Object.keys(groupedData).map(tableName => ({ tableName, columns: groupedData[tableName] }));
};

export const formatRelationsResponse = (data: RelationsQueryResult[]): FormattedRelationQueryResult[] =>
  data.map(({ fk_column, foreign_table, pk_column, primary_table }) => ({
    foreignTable: foreign_table, fkColumn: fk_column, primaryTable: primary_table, pkColumn: pk_column,
  }));
