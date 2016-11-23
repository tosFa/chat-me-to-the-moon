var babelJest = require('babel-jest');

module.exports = {
  process: function(src, filename) {console.log(12345);
    if (/\.css$/.test(filename)) {
      return ''
    } else {
      return babelJest.process(src, filename)
    }
  }
}