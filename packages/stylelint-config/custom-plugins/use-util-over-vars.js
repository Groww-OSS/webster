const stylelint = require('stylelint');

const ruleName = 'mint/use-util-class-instead-of-semantic-variable';
const messages = stylelint.utils.ruleMessages(ruleName, {
  warning: (variable, property) =>
    `Avoid using the semantic variable "${variable}" directly for "${property}". Use a utility class instead.`
});

const semanticVariables = [
  "--content-primary",
  "--content-secondary",
  "--content-tertiary",
  "--content-inverse-primary",
  "--content-inverse-secondary",
  "--background-primary",
  "--background-secondary",
  "--background-tertiary",
  "--background-overlay-primary",
  "--background-overlay-secondary",
  "--background-accent",
  "--background-positive",
  "--background-negative",
  "--background-warning",
  "--border-primary",
  "--border-accent",
  "--border-positive",
  "--border-negative",
  "--border-warning"
];

const isColorRelatedProperty = (property) => {
  return [
    'color',
    'background',
    'background-color'
  ].includes(property);
};

const isValidBorder = (value) => {
  return value.includes('1px solid');
};

module.exports = stylelint.createPlugin(ruleName, function(primaryOption) {
  return function(root, result) {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      {
        actual: primaryOption,
        possible: [true]
      }
    );

    if (!validOptions) return;

    root.walkDecls((decl) => {
      const property = decl.prop;
      const value = decl.value;

      // Ignore non-custom properties
      if (!semanticVariables.some((variable) => value.includes(variable))) return;

      // Exception for pseudo-classes and combinators
      const parent = decl.parent;
      if (parent && parent.selector && /::?\w|\s[>+~]/.test(parent.selector)) {
        return;
      }

      if (isColorRelatedProperty(property)) {
        stylelint.utils.report({
          message: messages.warning(value, property),
          node: decl,
          result,
          ruleName
        });
      } else if (property === 'border' && isValidBorder(value)) {
        stylelint.utils.report({
          message: messages.warning(value, property),
          node: decl,
          result,
          ruleName
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;