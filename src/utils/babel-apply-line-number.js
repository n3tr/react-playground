export function appendLineNumber() {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name === 'run') {
          const { end } = path.node.loc;
          path.node.arguments.push({ type: 'NumericLiteral', value: end.line })
        }
      }
    }
  }
}
