export default function babelInjectRunPlugin({ types: t }) {
  return {
    name: 'InjectRunPlugin',
    visitor: {
      Program(path) {
        const children = path.node.body;
        children.forEach((child, i) => {
          if (child.type !== 'ExpressionStatement') {
            return
          }

          const { start, end } = child.loc;
          const newPath = t.callExpression(
            t.identifier('__rpRun'), 
            [
              child.expression, 
              t.objectExpression([
                t.objectProperty(t.identifier('start'), t.numericLiteral(start.line)),
                t.objectProperty(t.identifier('end'), t.numericLiteral(end.line))
              ])
            ]
          );
          child.expression = newPath
        })
      }
    }
  };
};