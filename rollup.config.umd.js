import nodeResolve from 'rollup-plugin-node-resolve';
import { globalsRegex, GLOBAL } from 'rollup-globals-regex';

export default {
  entry: 'dist/bundles/ngx-strength-bar.es5.js',
  dest: 'dist/bundles/ngx-strength-bar.umd.js',
  format: 'umd',
  moduleName: 'ngxStrengthBar',
  plugins: [
    nodeResolve({ jsnext: true, browser: true })
  ],
  globals: globalsRegex({
    'tslib': 'tslib',
    [GLOBAL.NG2]: GLOBAL.NG2.TPL,
  }),
  external: (moduleId) => {
    if (/^(\@angular)\//.test(moduleId)) {
      return true;
    }

    return false;
  }
};
