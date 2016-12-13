const HappyPack = require('happypack');
const execSync = require('child_process').execSync;
const appRootPath = require('app-root-path').toString();

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
function happyPackPlugin({ name, loaders }) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 4,
    loaders,
  });
}

// :: [Any] -> [Any]
function removeEmpty(x) {
  return x.filter(y => !!y);
}

// :: bool -> (Any, Any) -> Any
function ifElse(condition) {
  return (then, or) => (condition ? then : or);
}

// :: ...Object -> Object
function merge() {
  const funcArgs = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-rest-params

  return Object.assign.apply(
    null,
    removeEmpty([{}].concat(funcArgs))
  );
}

function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootPath });
}

module.exports = {
  happyPackPlugin,
  removeEmpty,
  ifElse,
  merge,
  exec
};
