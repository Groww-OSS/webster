const stylelint = require('stylelint');

const ruleName = 'mint/no-primitive-color-variables';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) =>
    `The primitive color variable "${variable}" is not allowed. Use a semantic token or a utility class instead. Using a utility class is preferred.`
});

const plugin = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions) {
  const rawTokens = (secondaryOptions && Array.isArray(secondaryOptions.primitiveTokens))
    ? secondaryOptions.primitiveTokens
    : [];

  // Normalize to var(--token) format
  const bannedVariables = rawTokens.map(t => `var(--${t})`);

  return function (root, result) {
    if (!primaryOption) return;

    root.walkDecls(decl => {
      const normalizedValue = decl.value.replace(/\s+/g, ' ');

      const usedBannedVariable = bannedVariables.find(variable =>
        normalizedValue.includes(variable)
      );

      if (usedBannedVariable) {
        stylelint.utils.report({
          node: decl,
          message: messages.rejected(usedBannedVariable),
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
