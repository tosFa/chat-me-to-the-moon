import { isEqual } from 'lodash';

const serverAPI = (req, res) => {
  return {
    set: (name, value, days) => {
      if (!isEqual(req.cookies[name], value)) {
        res.cookie(name, value, {
          expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        });
      }
    },

    get: (name) => {
      return req.cookies[name];
    },
  };
};

const clientAPI = () => {
  return {
    set: (name, value, days) => {
      let expires = '';

      if (days) {
        const date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        expires = `; expires=${date.toGMTString()}`;
      }

      document.cookie = `${name}=${value}${expires}; path=/`;
    },

    get: (name) => {
      name = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');

      const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));

      return matches ? decodeURIComponent(matches[1]) : null;
    },
  };
};

export default (...args) => {
  return process.env.IS_NODE ? serverAPI(...args) : clientAPI(...args);
};