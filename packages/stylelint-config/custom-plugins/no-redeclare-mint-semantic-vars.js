const stylelint = require('stylelint');

const ruleName = 'mint/no-redeclared-semantic-variables';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) => `The semantic variable "${variable}" is already defined in mint and cannot be redeclared.`,
  restricted: (variable) => `Variable "${variable}" can only be declared within html scope.`
});

const plugin = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions) {
  const rawTokens = (secondaryOptions && Array.isArray(secondaryOptions.semanticTokens))
    ? secondaryOptions.semanticTokens
    : [];

  const bannedSemantics = rawTokens.map(token => `--${token}`);

  return function (root, result) {
    if (primaryOption === false) return;

    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      {
        actual: primaryOption,
        possible: [true, false]
      },
      {
        actual: secondaryOptions,
        possible: {
          allowHtmlScope: [true, false],
          semanticTokens: [() => true] // Accept any array for now
        },
        optional: true
      }
    );

    if (!validOptions) return;

    const allowHtmlScope = secondaryOptions?.allowHtmlScope ?? false;

    root.walkDecls((decl) => {
      if (!decl.prop.startsWith('--')) return;

      const isBanned = bannedSemantics.includes(decl.prop);
      if (!isBanned) return;

      if (allowHtmlScope) {
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
