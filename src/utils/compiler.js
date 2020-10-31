import * as Babel from "babel-standalone";
import applyLineNumber from 'utils/babel-apply-line-number';

Babel.registerPlugin('babel-apply-line-number', applyLineNumber);

export function compileCode(code, scope = {}) {
  const scopeKeys = Object.keys(scope).join(', ')
  const compiled = Babel.transform(
    code,
    {
      presets: ['es2015', 'react', 'stage-1'],
      plugins: ['babel-apply-line-number']
    }
  ).code
  return `((${scopeKeys}, run) => { var render = run; ${compiled} });`
}

export function execute(code, scope, run) {
  const args = Object.keys(scope).map( key => scope[key] )
  args.push(run)
  try {
    eval(code).apply(null, args) // eslint-disable-line no-eval  
  } catch (error) {
    throw error
  }
  
}

export function compileAndExecute(code, scope, run) {
  const compiledCode = compileCode(code, scope)
  execute(compiledCode, scope, run)
}