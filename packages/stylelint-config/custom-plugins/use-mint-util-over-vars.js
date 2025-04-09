const stylelint = require('stylelint');

const ruleName = 'mint/use-util-class-instead-of-semantic-variable';

const messages = stylelint.utils.ruleMessages(ruleName, {
  warning: (variable, property) =>
    `Avoid using the semantic variable "${variable}" directly for "${property}". Use a utility class instead.`
});

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

const plugin = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions) {
  const rawTokens = (secondaryOptions && Array.isArray(secondaryOptions.semanticTokens))
    ? secondaryOptions.semanticTokens
    : [];

  // Normalize to `var(--token-name)` format
  const semanticVariables = rawTokens.map(t =>`var(--${t})`);

  return function (root, result) {
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

      const usedSemanticVariable = semanticVariables.find((variable) => value.includes(variable));
      if (!usedSemanticVariable) return;

      // Ignore pseudo-classes and combinators
      const parent = decl.parent;
      if (parent && parent.selector && /::?\w|\s[>+~]/.test(parent.selector)) return;

      if (isColorRelatedProperty(property) || (property === 'border' && isValidBorder(value))) {
        stylelint.utils.report({
          message: messages.warning(usedSemanticVariable, property),
          node: decl,
          result,
          ruleName
        });
      }
    });
  };
});

plugin.ruleName = ruleName;
plugin.messages = messages;

module.exports = plugin;
