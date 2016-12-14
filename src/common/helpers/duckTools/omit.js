/**
 * omit returns copy of object without properties given in paths argument
 * @param {Object} object
 * @param {Array} paths object properties to remove
 */
export default (object = {}, paths = []) => {
  if (typeof object !== 'object' || !Array.isArray(paths)) {
    return null;
  }

  const newObject = Object.assign({}, object);
  paths.forEach(path => delete newObject[path]);

  return newObject;
};