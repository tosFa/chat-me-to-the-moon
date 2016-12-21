import fetch  from 'isomorphic-fetch';
import environmentConfig from '../../../config/private/environment';
import { merge } from 'lodash';

const headers = (extraHeaders) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...extraHeaders
});

export default (relativeUrl, options = {}) => {
  const baseUrl = `${environmentConfig.apiProtocol}://${environmentConfig.apiHost}:${environmentConfig.apiPort}`;

  options = merge({}, { headers: headers(), method: 'GET'}, options);

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${relativeUrl}`, options)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}
