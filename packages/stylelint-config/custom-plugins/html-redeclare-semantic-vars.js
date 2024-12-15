const stylelint = require('stylelint');

const ruleName = 'mint/html-redeclared-semantic-variables';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variable) =>
    `Variable "${variable}" can only be declared within these selectors: html, html[data-theme=\"dark\"]`
});

const disallowedVariables = [
  "--background-primary",
  "--background-primary-dark",
  "--background-secondary",
  "--background-tertiary",
  "--background-transparent",
  "--background-surface-primary",
  "--background-surface-primary-dark",
  "--background-surface-secondary",
  "--background-surface-secondary-dark",
  "--background-inverse-primary",
  "--background-inverse-primary-dark",
  "--background-overlay-primary",
  "--background-overlay-secondary",
  "--background-always-dark",
  "--background-always-light",
  "--background-accent",
  "--background-positive",
  "--background-negative",
  "--background-warning",
  "--background-accent-subtle",
  "--background-positive-subtle",
  "--background-negative-subtle",
  "--background-warning-subtle",
  "--background-accent-secondary",
  "--background-accent-secondary-subtle",
  "--border-primary",
  "--border-disabled",
  "--border-accent",
  "--border-positive",
  "--border-negative",
  "--border-neutral",
  "--content-primary",
  "--content-secondary",
  "--content-tertiary",
  "--content-inverse-primary",
  "--content-inverse-secondary",
  "--content-accent",
  "--content-negative",
  "--content-warning",
  "--content-positive",
  "--content-disabled",
  "--content-on-colour",
  "--content-on-colour-inverse",
  "--content-accent-secondary",
  "--content-accent-secondary-subtle",
];

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
      // Only check custom property declarations
      if (!decl.prop.startsWith('--')) return;

      // Check if the property matches any disallowed variables
      const isDisallowed = disallowedVariables.some(variable =>
        decl.prop === variable || decl.prop.startsWith(`${variable}-`)
      );

      if (!isDisallowed) return;

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
            // Normalize selectors by removing whitespace
            const normalizedSelector = selector.replace(/\s+/g, '');
            const normalizedAllowed = allowedSelector.replace(/\s+/g, '');

            // Handle exact matches
            return normalizedSelector === normalizedAllowed;
          });

          if (isAllowed) break;
        }

        parent = parent.parent;
      }

      if (!isAllowed) {
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

module.exports.ruleName = ruleName;
module.exports.messages = messages;
