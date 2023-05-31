import { RelationItem } from '../dto/relationItem.dto';

export const patchRelationsDataWithModelsId = (
  modelItemsMap: Map<string, number>,
  relations: RelationItem[],
) => relations.map((relation: RelationItem) => ({
  firstModelItemId: modelItemsMap.get(relation.firstTableName),
  secondModelItemId: modelItemsMap.get(relation.secondTableName),
  firstModelItemField: relation.firstTableColumn,
  secondModelItemField: relation.secondTableColumn,
}));

export const createModelItemsMapForRelations = (modelItems): Map<string, number> =>
  modelItems.reduce((map, curr) => {
    map.set(curr.table_name, curr.id);
    return map;
  }, new Map());

export const formModel = ({model_id, model_name}) => ({
  id: model_id,
  name: model_name,
});

export const formModelItem = ({table_id, table_name, relation_id}) => ({
  id: table_id,
  name: table_name,
  relations: relation_id ? [relation_id] : [],
});

export const formModelItemField = ({field_id, field_given_name, field_type}) => ({
  id: field_id,
  name: field_given_name,
  type: field_type,
});

export const formModelItemWithFields = (item) => ({
  ...formModelItem(item),
  fields: [formModelItemField(item)],
});

export const formModelDataForReportResponse = (data) => data.reduce((acc, curr) => {
  const model = acc.find(_ => _.id === curr.model_id);
  if ( model) {
    const table = model.items.find(_ => _.id === curr.table_id);
    if (table) {
      const relation = table.relations.find(_ => _ === curr.relation_id);
      if (!relation && curr.relation_id) {
        table.relations.push(curr.relation_id);
      }
      const newField = formModelItemField(curr);
      const field = table.fields.find(_ => _.name === newField.name && _.type === newField.type);
      if (!field) {
        table.fields.push(newField);
      }
    } else {
      model.items.push(formModelItemWithFields(curr));
    }
  } else {
    acc.push({
      ...formModel(curr),
      items: [{
        ...formModelItemWithFields(curr),
      }],
    });
  }
  return acc;
}, []);
