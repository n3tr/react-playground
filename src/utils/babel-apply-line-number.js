export default ({ types: t }) => {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name === 'run' || path.node.callee.name === 'render') {
          const { start, end } = path.node.loc;
          path.node.arguments.push(t.objectExpression([
            t.objectProperty(t.identifier('start'), t.numericLiteral(start.line)),
            t.objectProperty(t.identifier('end'), t.numericLiteral(end.line))
          ]));
        }
      }
    }
  }
}
