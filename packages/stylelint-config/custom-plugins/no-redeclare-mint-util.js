const stylelint = require('stylelint');

const ruleNameClasses = 'mint/no-redeclared-utility-classes';

const {allUtilClasses} =require('../mint-values/index.js');


const messagesClasses = stylelint.utils.ruleMessages(ruleNameClasses, {
  rejected: (className) => `The utility class "${className}" is already defined in mint and cannot be redeclared.`
});

const bannedClasses = [
  ...allUtilClasses
];

const pluginClasses = stylelint.createPlugin(ruleNameClasses, function (enabled) {
  return function (root, result) {
    if (!enabled) return;

    root.walkRules(rule => {
      const selectors = rule.selector.split(',').map(sel => sel.trim());

      selectors.forEach(selector => {
        // Normalize selector to handle partial matches like pseudo-classes, combinators, etc.
        const normalizedSelector = selector.replace(/:[:]?\w+|\s*([>+~])\s*/g, '').trim();

        bannedClasses.forEach(bannedClass => {
          const classPattern = new RegExp(`\\.${bannedClass}(\\s|$|[:.{])`); // Matches .class, .class:hover, .class.subclass

          if (classPattern.test(selector)) {
            stylelint.utils.report({
              node: rule,
              message: messagesClasses.rejected(selector),
              result,
              ruleName: ruleNameClasses
            });
          }
        });
      });
    });
  };
});

pluginClasses.ruleName = ruleNameClasses;
pluginClasses.messages = messagesClasses;

module.exports = pluginClasses;
