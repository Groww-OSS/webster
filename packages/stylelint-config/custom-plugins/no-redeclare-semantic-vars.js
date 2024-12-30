const stylelint = require('stylelint');

const { semanticTokens } = require('../mint-values/index.js');

const ruleName = 'mint/no-redeclared-semantic-variables';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) => `The semantic variable "${variable}" is already defined in mint and cannot be redeclared.`,
  restricted: (variable) => `Variable "${variable}" can only be declared within html scope.`
});

const bannedSemantics = [
  ...semanticTokens
];

const plugin = stylelint.createPlugin(ruleName, function (options) {
  return function (root, result) {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      {
        actual: options,
        possible: {
          allowHtmlScope: [true, false],
        },
      }
    );

    if (!validOptions) return;

    const { allowHtmlScope } = options;

    root.walkDecls((decl) => {
      // Check if the declaration is a variable definition
      if (!decl.prop.startsWith('--')) return;

      // Check if the property matches any banned semantic variables
      const isBanned = bannedSemantics.includes(decl.prop);
      if (!isBanned) return;

      if (allowHtmlScope) {
        // Get all ancestor rules of this declaration
        let parent = decl.parent;
        let isAllowed = false;

        while (parent) {
          if (parent.type === 'rule') {
            const selector = parent.selector;

            isAllowed = [
              'html',
              'html[data-theme="dark"]'
            ].some(allowedSelector => {
              const normalizedSelector = selector.replace(/\s+/g, '');
              const normalizedAllowed = allowedSelector.replace(/\s+/g, '');

              return normalizedSelector === normalizedAllowed;
            });

            if (isAllowed) break;
          }
          parent = parent.parent;
        }

        if (!isAllowed) {
          stylelint.utils.report({
            message: messages.restricted(decl.prop),
            node: decl,
            result,
            ruleName
          });
        }
      } else {
        stylelint.utils.report({
          message: messages.rejected(decl.prop),
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
