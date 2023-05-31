import {
  createModelItemsMapForRelations,
  formModel,
  formModelItem,
  formModelItemField, formModelItemWithFields,
  patchRelationsDataWithModelsId,
} from '../utils';
import { RelationItem } from '../dto/relationItem.dto';

describe('models/utils', () => {
  const mockModelItemsMap = new Map([
    ['tableName1', 1],
    ['tableName2', 2],
    ['tableName3', 3],
    ['tableName4', 4],
  ]);
  const mockRelationItems: RelationItem[] = [
    { firstTableName: 'tableName1', secondTableName: 'tableName2', firstTableColumn: '', secondTableColumn: '' },
    { firstTableName: 'tableName3', secondTableName: 'tableName4', firstTableColumn: '', secondTableColumn: '' },
  ];
  const modelItemField = {
    field_id: 1,
    field_given_name: '123',
    field_type: 'fact',
  };
  const modelItem = {
    table_id: 1,
    table_name: '123',
    relation_id: 1,
  };
  const model = {
    model_id: 1,
    model_name: '123',
  };
  describe('patchRelationsDataWithModelsId', () => {
    it('should format data properly', () => {
      const expectedData = [
        { firstModelItemId: 1, secondModelItemId: 2, firstModelItemField: '', secondModelItemField: '' },
        { firstModelItemId: 3, secondModelItemId: 4, firstModelItemField: '', secondModelItemField: '' },
      ];
      expect(patchRelationsDataWithModelsId(mockModelItemsMap, mockRelationItems)).toStrictEqual(expectedData);
    });
  });
  describe('createModelItemsMapForRelations', () => {
    const modelItems = [
      { table_name: 'tableName1', id: 1 },
      { table_name: 'tableName2', id: 2 },
    ];
    const expectedResult = new Map([
      ['tableName1', 1],
      ['tableName2', 2],
    ]);
    expect(createModelItemsMapForRelations(modelItems)).toStrictEqual(expectedResult);
  });

  describe('formModel', () => {
    const expectedRes = {
      id: 1,
      name: '123',
    };
    expect(formModel(model)).toStrictEqual(expectedRes);
  });

  describe('formModelItem', () => {

    const expectedRes = {
      id: 1,
      name: '123',
      relations: [1],
    };
    expect(formModelItem(modelItem)).toStrictEqual(expectedRes);
  });

  describe('formModelItemField', () => {
    const expectedRes = {
      id: 1,
      name: '123',
      type: 'fact',
    };
    expect(formModelItemField(modelItemField)).toStrictEqual(expectedRes);
  });

  describe('formModelItemField', () => {
    const expectedRes = {
      id: 1,
      name: '123',
      relations: [1],
      fields: [{
        id: 1,
        name: '123',
        type: 'fact',
      }],
    };
    expect(formModelItemWithFields(Object.assign(modelItem, modelItemField))).toStrictEqual(expectedRes);
  });

});
