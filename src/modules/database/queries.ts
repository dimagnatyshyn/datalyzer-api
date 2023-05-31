const dataBaseSelectTablesAndColumnsQuery = {
  postgres: `
    SELECT tablename AS table, column_name AS column, data_type as type
    FROM pg_catalog.pg_tables
    INNER JOIN information_schema.columns
    ON table_name = tablename
    WHERE table_schema = 'public'
  `,
};

const dataBaseRelationsQuery = {
  postgres: `
    SELECT kcu.table_name AS foreign_table,
    string_agg(kcu.column_name, ', ') AS fk_column,
    rel_tco.table_name AS primary_table,
    'id' AS pk_column
    FROM information_schema.table_constraints tco
    JOIN information_schema.key_column_usage kcu
    ON tco.constraint_schema = kcu.constraint_schema
    and tco.constraint_name = kcu.constraint_name
    JOIN information_schema.referential_constraints rco
    ON tco.constraint_schema = rco.constraint_schema
    and tco.constraint_name = rco.constraint_name
    JOIN information_schema.table_constraints rel_tco
    ON rco.unique_constraint_schema = rel_tco.constraint_schema
    and rco.unique_constraint_name = rel_tco.constraint_name
    WHERE tco.constraint_type = 'FOREIGN KEY'
    GROUP BY kcu.table_schema,
    kcu.table_name,
    rel_tco.table_name,
    rel_tco.table_schema,
    kcu.constraint_name
    ORDER BY kcu.table_schema,
    kcu.table_name;`,
};

export default {
  dataBaseSelectTablesAndColumnsQuery,
  dataBaseRelationsQuery,
};
