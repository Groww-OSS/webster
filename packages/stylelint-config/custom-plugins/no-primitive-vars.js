const stylelint = require('stylelint');

const ruleName = 'mint/no-primitive-color-variables';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) => `The primitive color variable "${variable}" is not allowed. Use a semantic token or a utility class instead. Using a utility class is preferred.`
});

// List of banned primitive color variables
const bannedVariables = [
  '--green500',
  '--gray900'
];

const plugin = stylelint.createPlugin(ruleName, function (enabled) {
  return function(root, result) {
    // Skip if the rule is not enabled
    if (!enabled) return;

    // Walk through all CSS declarations
    root.walkDecls(decl => {
      // Normalize whitespace in the declaration value
      const normalizedValue = decl.value.replace(/\s+/g, ' ');

      // Check if any banned variables are used
      const usedBannedVariable = bannedVariables.find(variable => 
        normalizedValue.includes(`var(${variable})`)
      );

      // Report an error if a banned variable is found
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