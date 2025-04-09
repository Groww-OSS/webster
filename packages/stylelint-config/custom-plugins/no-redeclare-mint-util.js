const stylelint = require('stylelint');

const ruleName = 'mint/no-redeclared-utility-classes';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (className) => `The utility class "${className}" is already defined in mint and cannot be redeclared.`
});

const plugin = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions) {
  const rawClasses = (secondaryOptions && Array.isArray(secondaryOptions.utilityClasses))
    ? secondaryOptions.utilityClasses
    : [];

  // Normalize by ensuring no leading `.` (we’ll add it in the regex)
  const bannedClasses = rawClasses.map(c => c.replace(/^\./, ''));

  return function (root, result) {
    if (!primaryOption) return;

    root.walkRules(rule => {
      const selectors = rule.selector.split(',').map(sel => sel.trim());

      selectors.forEach(selector => {
        const normalizedSelector = selector.replace(/:[:]?\w+|\s*([>+~])\s*/g, '').trim();

        bannedClasses.forEach(bannedClass => {
          // Match full class with optional pseudo/selectors
          const classPattern = new RegExp(`\\.${bannedClass}(\\s|$|[:.{])`);

          if (classPattern.test(selector)) {
            stylelint.utils.report({
              node: rule,
              message: messages.rejected(selector),
              result,
              ruleName
            });
          }
        });
      });
    });
  };
});

plugin.ruleName = ruleName;
plugin.messages = messages;

module.exports = plugin;
