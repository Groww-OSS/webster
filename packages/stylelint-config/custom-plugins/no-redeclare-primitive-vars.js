const stylelint = require('stylelint');

const ruleName = 'mint/no-redeclared-primitive-variables';

const {primitiveTokens} =require('../mint-values/index.js');

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) => `The primitive variable "${variable}" is already defined in mint and cannot be redeclared.`
});

const bannedPrimitives = [
  ...primitiveTokens
];

const plugin = stylelint.createPlugin(ruleName, function (enabled) {
  return function (root, result) {
    if (!enabled) return;

    root.walkDecls(decl => {
      // Check if the declaration is a variable definition (e.g., --green500: #00ff00;)
      const isVariableDeclaration = decl.prop.startsWith('--');

      if (isVariableDeclaration && bannedPrimitives.includes(decl.prop)) {
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
