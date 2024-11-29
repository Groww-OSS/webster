export default function transformer(file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);

    // Transform JSX opening elements with double parentheses in return statements
  root
    .find(j.ReturnStatement)
    .filter(path => {
      const argument = path.node.argument;

      console.log(argument);
      return (
        argument &&
          argument.type === 'JSXElement' &&
          argument.extra &&
          argument.extra.parenthesized
      );
    })
    .replaceWith(path => {
      const argument = path.node.argument;

      argument.extra.parenthesized = false; // Remove the parentheses
      return path.node;
    });


  return root.toSource();
}

;
