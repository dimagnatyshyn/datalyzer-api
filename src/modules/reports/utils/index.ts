export const separateFactsAndDimensionFields = (data) => data.reduce(((acc, curr) => {
  if (curr.model_item_field.type === 'fact') {
    acc.facts.push(curr.model_item_field.given_name);
  } else {
    acc.dimensions.push(curr.model_item_field.given_name);
  }
  return acc;
}), { facts: [], dimensions: [] });
