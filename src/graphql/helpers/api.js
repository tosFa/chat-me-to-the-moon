import fetch  from 'isomorphic-fetch';
const envVars = require('../../../tools/config/envVars');
import { merge } from 'lodash';

const headers = (extraHeaders) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...extraHeaders
});

export default (relativeUrl, options = {}) => {
  const baseUrl = `${envVars.API_PROTOCOL}://${envVars.API_SERVER}:${envVars.API_PORT}`;

  options = merge({}, { headers: headers(), method: 'GET'}, options);

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${relativeUrl}`, options)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
