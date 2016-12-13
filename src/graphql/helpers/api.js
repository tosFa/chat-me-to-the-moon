import fetch  from 'isomorphic-fetch';

const headers = () => {
  return {
    'Content-Type': 'application/json'
  };
}
export default (relativeUrl, options = {}) => {

  const baseUrl = 'http://localhost:3000';


  options = Object.assign({}, { headers: headers(), method: 'GET'}, options);
console.log('options: ', options);
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${relativeUrl}`, options)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}