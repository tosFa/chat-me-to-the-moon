const defineTypes = (types, prefix = '') => {
  if (!Array.isArray(types)) {
    throw new Error('defineTypes(...): Argument must be an array.');
  }

  prefix = prefix ? `${prefix}/` : '';

  return types.reduce((acc, type) => (
    { ...acc, [type]: `${prefix}${type}`.toUpperCase() }
  ), {});
};

export const defineTypesAsArray = (types, prefix = '') => {
  const definedTypes = defineTypes(types, prefix);

  return Object.keys(definedTypes).map(key => definedTypes[key]);
};

export default defineTypes;
