import isObject from 'lodash/isObject';

const getTableNodes = (row, prefix = '', excludeNodes = ['__typename']) => {
  return Object.keys(row)
    .filter(objectKey => excludeNodes.indexOf(objectKey) < 0)
    .map(objectKey => {
      if (isObject(row[objectKey])) {
        return prefix !== '' ? getTableNodes(row[objectKey], [prefix, objectKey].join('.')) : getTableNodes(row[objectKey], objectKey)
      }
      return prefix !== '' ? [prefix, objectKey].join('.') : objectKey;

    }).reduce((accumulatedValue, currentValue) => {
      if (Array.isArray(currentValue)) {
        currentValue.forEach(node => accumulatedValue.push(node))
      } else {
        accumulatedValue.push(currentValue);
      }

      return accumulatedValue;
    }, []);
}

export default getTableNodes;