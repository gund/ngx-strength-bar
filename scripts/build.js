const fs = require('fs')
const exec = require('child_process').exec

const NODE_BIN = `node_modules/.bin`

const NGC = `"${NODE_BIN}/ngc"`
const TSC = `"${NODE_BIN}/tsc"`
const ROLLUP = `"${NODE_BIN}/rollup"`
const RIMRAF = `"${NODE_BIN}/rimraf"`
const UGLIFYJS = `"${NODE_BIN}/uglifyjs"`
const copyup = `"${NODE_BIN}/copyup"`
const ncp = `"${NODE_BIN}/ncp"`
const ng2Inline = `"${NODE_BIN}/ng2-inline"`

const cleanup = `${RIMRAF} dist`
const buildMain = `${NGC} -p tsconfig.es2015.json`
const buildFesmEs2015 = `${ROLLUP} -c rollup.config.js`
const buildFesmEs5 = `${TSC} -p tsconfig.es5.json`
const buildUmd = `${ROLLUP} -c rollup.config.umd.js`
const buildUmdMin = `${UGLIFYJS} -c --screw-ie8 --comments -o dist/bundles/ngx-strength-bar.umd.min.js dist/bundles/ngx-strength-bar.umd.js`
const removeTmpFesmEs5 = `${RIMRAF} dist/bundles/es5`
const copyProject = `${copyup} src/index.ts dist/tmp && ${ncp} src/strength-bar dist/tmp/strength-bar`
const inlineTplAndStyles = `${ng2Inline} -u 1 -o dist/tmp -r src/strength-bar/**/*.component.ts`
const removeTempProj = `${RIMRAF} dist/tmp`;

execP(cleanup)
  .then(() => console.log('Copying into temporary project...'))
  .then(() => execP(copyProject))
  .then(() => console.log('OK.\n\nInlining templates and styles...'))
  .then(() => execP(inlineTplAndStyles))
  .then(() => console.log('OK.\n\nCompiling project...'))
  .then(() => execP(buildMain))
  .then(() => console.log('OK.\n\nRemoving temporary project...'))
  .then(() => execP(removeTempProj))
  .then(() => console.log('OK.\n\nBuilding FESM ES2015...'))
  .then(() => execP(buildFesmEs2015))
  .then(() => console.log('OK.\n\nBuilding FESM ES5...'))
  .then(() => execP(buildFesmEs5))
  .then(() => moveFesmEs5())
  .then(() => execP(removeTmpFesmEs5))
  .then(() => console.log('OK.\n\nBuilding UMD...'))
  .then(() => execP(buildUmd))
  .then(() => console.log('OK.\n\nMinifiyng UMD...'))
  .then(() => execP(buildUmdMin))
  .then(() => console.log('OK.\n\n'))
  .catch(e => console.error(e))

function moveFesmEs5() {
  fs.renameSync('dist/bundles/es5/ngx-strength-bar.es2015.js', 'dist/bundles/ngx-strength-bar.es5.js')
}

function execP(string) {
  return new Promise((res, rej) => {
    exec(string, (err, stdout) => err ? rej(err) : res(stdout))
  })
}
