export default ({ types: t }) => {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name === 'run') {
          const { end } = path.node.loc;
          path.node.arguments.push(t.numericLiteral(end.line));
        }
      }
    }
  }
}
