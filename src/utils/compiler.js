import * as Babel from "babel-standalone";
import { appendLineNumber } from 'utils/babel-apply-line-number';

Babel.registerPlugin('babel-apply-line-number', appendLineNumber);

export function compileCode(code, scope = {}) {
  const scopeKeys = Object.keys(scope).join(', ')
  console.log(scopeKeys)
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
  eval(code).apply(null, args)
}

export function compileAndExecute(code, scope, run) {
  const compiledCode = compileCode(code, scope)
  execute(compiledCode, scope, run)
}