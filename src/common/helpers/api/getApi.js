import createMethod from './createMethod';

const methods = ['get', 'post', 'put', 'patch', 'remove'];

export default (headers) => {
  return methods.reduce((acc, method) => {
    return { ...acc, [method]: createMethod(headers, method) };
  }, {});
};
