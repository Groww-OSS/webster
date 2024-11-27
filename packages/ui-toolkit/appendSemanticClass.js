const updatedMappings = require('./updatedMappings.json');

module.exports = async function updateClassNames(file, api) {
  const j = api.jscodeshift;
  const { source, path } = file;
  const root = j(source);

    // Prepare a mapping of classNames with their semantic utility classes for one occurrence
  const classMapping = updatedMappings.reduce((acc, mapping) => {
    if (mapping.classNameOccurrences === 1) {
      acc[mapping.className] = mapping.semanticUtilClass;
    }

    return acc;
  }, {});

    // Attributes to be checked for updating classNames
  const attrToBeUpdated = [
    'className',
    'class',
    'containerClassName',
    'addAnchorClass',
    'customHeadingStyle',
    'titleClassName',
    'titleClass',
    'customStyleTab',
    'parentClass',
    'textClassName',
    'headerClass',
    'inputClass',
    'textClass',
    'parentClassName',
    'optionsParentClass',
    'activeOptionBoxClass',
    'addParentClass'
  ];

    // Function to replace old class names with new class names
  const replaceWithNewClassNames = (classNames) => {
    return classNames.map((className) => {
      const utilClass = classMapping[className];

      return utilClass ? `${className} ${utilClass}` : className;
    });
  };

  await Promise.all(
    root.find(j.JSXOpeningElement).nodes().map(async (element) => {
      const { attributes } = element;

            // Find attributes to update
      const allFoundAttributes = attributes.filter(
        (attr) => attr.name && attrToBeUpdated.includes(attr.name.name)
      );

      for (const classNameAttribute of allFoundAttributes) {
        if (classNameAttribute && classNameAttribute.value) {
          const { expression } = classNameAttribute.value;

                    // Handle different expression types
          if (expression?.type === 'CallExpression') {
            const { arguments: args } = expression;

            for (const arg of args) {
              if (arg.type === 'StringLiteral') {
                let classNames = arg.value.split(' ');

                classNames = replaceWithNewClassNames(classNames);
                arg.value = classNames.join(' ');
              }
            }

          } else if (expression?.type === 'TemplateLiteral') {
            for (let i = 0; i < expression.quasis.length; i++) {
              const quasi = expression.quasis[i];

              if (quasi.value.raw) {
                let classNames = quasi.value.raw.split(' ');

                classNames = replaceWithNewClassNames(classNames);
                quasi.value.raw = classNames.join(' ');
                quasi.value.cooked = classNames.join(' ');
              }
            }

          } else if (expression?.type === 'BinaryExpression') {
            if (expression.left?.type === 'StringLiteral') {
              let classNames = expression.left.value.split(' ');

              classNames = replaceWithNewClassNames(classNames);
              expression.left.value = classNames.join(' ');
            }

            if (expression.right?.type === 'StringLiteral') {
              let classNames = expression.right.value.split(' ');

              classNames = replaceWithNewClassNames(classNames);
              expression.right.value = classNames.join(' ');
            }

          } else if (expression?.type === 'StringLiteral') {
            let classNames = expression.value.split(' ');

            classNames = replaceWithNewClassNames(classNames);
            expression.value = classNames.join(' ');

          } else if (classNameAttribute.value?.value) {
            let classNames = classNameAttribute.value.value.split(' ');

            classNames = replaceWithNewClassNames(classNames);
            classNameAttribute.value.value = classNames.join(' ');
          }
        }
      }

      return element;
    })
  );

  return root.toSource({ quote: 'single' });
};

// Example usage:
// jscodeshift --parser=tsx --extensions=ts,tsx,js,jsx -t updateClassNames.js --ignore-pattern="**/public/**" --ignore-pattern="**/build/**" --ignore-pattern="**/.next/**" --ignore-pattern="**/.turbo/**" --ignore-pattern="**/node_modules/**" path/to/source
