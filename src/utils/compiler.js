import * as Babel from "babel-standalone";
import applyLineNumber from 'utils/babel-apply-line-number';

Babel.registerPlugin('babel-apply-line-number', applyLineNumber);

export function compileCode(code, scope = {}) {
  const scopeKeys = Object.keys(scope).join(', ')
  const compiled = Babel.transform(
    code,
    {
      presets: ['es2015', 'stage-1', 'react'],
      plugins: ['babel-apply-line-number']
    }
  ).code
  return `((${scopeKeys}, run) => { ${compiled} });`
}

export function execute(code, scope, run) {
  const args = Object.keys(scope).map( key => scope[key] )
  args.push(run)
  eval(code).apply(null, args) // eslint-disable-line no-eval
}

export function compileAndExecute(code, scope, run) {
  const compiledCode = compileCode(code, scope)
  execute(compiledCode, scope, run)
}