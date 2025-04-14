const stylelint = require('stylelint');

const ruleName = 'mint/no-redeclared-primitive-variables';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) => `The primitive variable "${variable}" is already defined in mint and cannot be redeclared.`
});

const plugin = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptions) {
  // Use the tokens provided via secondaryOptions, or default to an empty array.
  const bannedPrimitivesRaw = (secondaryOptions && Array.isArray(secondaryOptions.primitiveTokens))
    ? secondaryOptions.primitiveTokens
    : [];

  // Normalize tokens: if a token doesn't start with "--", prepend it.
  const bannedPrimitives = bannedPrimitivesRaw.map(token => `--${token}`);

  return function(root, result) {
    if (!primaryOption) return;

    root.walkDecls(decl => {
      // Check if the declaration is a CSS variable (e.g., --green500: #00ff00;)
      if (decl.prop.startsWith('--') && bannedPrimitives.includes(decl.prop)) {
        stylelint.utils.report({
          node: decl,
          message: messages.rejected(decl.prop),
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
