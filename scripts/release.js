const fs = require('fs');
const ncp = require('ncp').ncp;
const copyfiles = require('copyfiles');
const package = require('../package.json');

['main', 'module', 'es2015', 'typings'].forEach(prop =>
  package[prop] = fixPathDist(package[prop]));

delete package.config;
delete package.scripts;
delete package.devDependencies;

try {
  fs.writeFileSync('dist/package.json', JSON.stringify(package, null, '  '));
  console.log('package.json was written');
} catch (e) {
  console.error(`Failed to write package.json file due to: ${e}`);
}

try {
  copyfiles([
    'README.md',
    'LICENSE',
    'yarn.lock',
    'dist' // Destination path
  ], {}, () => null);
  console.log('Copied additional files');
} catch (e) {
  console.error(`Failed to copy additional files due to: ${e}`);
  process.exit(1);
}

ncp('.git', 'dist/.git', (err) => {
  if (err) {
    console.error(`Failed to copy .git dir due to:\n${err}`);
    process.exit(1);
  }
  console.log('Copied .git directory for releasing');
});

function fixPathDist(path = '') {
  return path.startsWith('dist/') ? path.replace('dist/', '') : path;
}
