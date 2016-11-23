import superagent from 'superagent';
import qs from 'qs';
import log from '../logger';
import { forEach, pickBy } from 'lodash';
import config from '../../../../tools/config/api';
//import pb from 'helpers/progressbar';

const rlist = {};

const filterEmptyParams = (params) => {
  return pickBy(params, (value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value === 'object') {
      return Object.keys(value).length > 0;
    }

    return value !== undefined && value !== null;
  });
};

const formatUrl = (url) => {
  url = url[0] === '/' ? url : `/${url}`;
  return url;

  //if (__SERVER__) {
  //  return `http://${config.API_HOST}:${config.API_PORT}${url}`;
  //}

  return `http://${config.root}:${config.port}/${config.version}${url}`;
};

export default (defaultHeaders, method) => {
  defaultHeaders = {
    Accept: 'application/json',
    ...defaultHeaders,
  };

  return (store, url, options = {}) => {
    const { getState } = store;

    url = formatUrl(url);

    const { id = `${method}:${url}`, body, query, attach, headers } = options;

    if (process.env.IS_NODE) {
      log.apiRequest(method, url);
    }

    if (rlist[id]) {
      rlist[id].abort();
    }

    const request = rlist[id] = superagent[method](url);

    forEach({ ...defaultHeaders, ...headers }, (val, key) => {
      request.set(key, val);
    });

    if (body) {
      request.send(body);
    }

    if (query) {
      const string = qs.stringify(filterEmptyParams(query));

      if (string) {
        request.query(string);
      }
    }

    if (attach) {
      if (Array.isArray(attach)) {
        attach.forEach((item) => request.attach(item.name, item))
      } else {
        request.attach(attach.name, attach);
      }
    }

    //request.on('progress', () => {
    //  pb.trickle();
    //});

    return new Promise((resolve, reject) => {
      const onResponse = (res) => {
        delete rlist[id];

        if (res.response) {
          res = res.response;
        }

        //if (!Object.keys(rlist).length) {
        //  pb.done();
        //}

        res.status = res.status || 500;
        log.apiResponse(res.status, method, url);

        if (res.status < 400) {
          return resolve({ result: res.body });
        }

        return reject({ error: res.error, result: res.body || {} });
      };

      //if (!pb.status()) {
      //  pb.start();
      //}

      request
        .on('abort', onResponse.bind(null, { status: null, error: 'aborted' }))
        .timeout(Number(config.requestTimeout))
        .then(onResponse, onResponse);
    });
  };
};