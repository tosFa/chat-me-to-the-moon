import logatim from 'logatim';
const config = {
  logLevel: 'debug'
}

const noop = () => {};

logatim.setLevel(config.logLevel);

const time = () => {
  return new Date()
    .toString()
    .split(' ')
    .splice(4)
    .slice(0, -2)
    .join(' ');
};

logatim.info(time(), `log level is ${config.logLevel}`);

const logger = {
  trace: (...args) => logatim.trace(time(), ...args),
  debug: (...args) => logatim.debug(time(), ...args),
  info: (...args) => logatim.info(time(), ...args),
  warn: (...args) => logatim.warn(time(), ...args),
  error: (...args) => logatim.error(time(), ...args),

  apiRequest: (method, url) => {
    logatim.info(`${time()} | ${method.toUpperCase()} ${url}`);
  },

  apiResponse: (status, method, url) => {
    const text = `${time()} | ${status} ${method.toUpperCase()} ${url}`;

    if (status >= 400) {
      logatim.red(text).info();
    } else {
      logatim.info(text);
    }
  },
};

if (process.env.IS_NODE) {
  const PrettyError = require('pretty-error');
  const pretty = new PrettyError();

  Object.assign(logger, {
    error: (group, err) => logatim.error(time(), group, pretty.render(err)),
    markOk: text => logatim(`${time()} ✅  ${text}.`).info(),
    markWarn: text => logatim(`${time()} ❗  ${text}.`).info(),
    serverRequest: (method, url) => {
      logatim.info(`${time()} ${method.toUpperCase()} ${url}`);
    },
    serverResponse: (status, method, url) => {
      const text = `${time()} ${status} ${method.toUpperCase()} ${url}`;

      if (status >= 400) {
        logatim.red(text).info();
      } else {
        logatim.info(text);
      }
    },
  });
}

if (!process.env.IS_NODE) {
  Object.assign(logger, {
    apiRequest: noop,
    apiResponse: noop,
  });
}

export default logger;
