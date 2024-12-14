const stylelint = require('stylelint');

const ruleName = 'custom/no-primitive-color-variables';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (variableName) =>
    `Usage of primitive color variable "${variableName}" is not allowed. Use semantic variables or utility classes instead.`
});

const bannedVariables = [
  '--green500',
  '--gray900'
  // Add more banned variables as needed
];

module.exports = stylelint.createPlugin(ruleName, function() {
  return function(postcssRoot, postcssResult) {
    console.log('Stylelint custom rule is running...');

    // Iterate through all CSS declarations
    postcssRoot.walkDecls(decl => {
      console.log(`Checking declaration: ${decl.prop} = ${decl.value}`);

      // Check for banned variable declarations
      if (bannedVariables.includes(decl.prop)) {
        stylelint.utils.report({
          node: decl,
          message: messages.rejected(decl.prop),
          result: postcssResult,
          ruleName
        });
      }

      // Check for banned variables in var() usages
      if (decl.value && decl.value.includes('var(')) {
        bannedVariables.forEach(bannedVar => {
          // Use regex for precise matching
          if (new RegExp(`\\b${bannedVar}\\b`).test(decl.value)) {
            console.log(`Found banned variable: ${bannedVar} in ${decl.value}`);
            stylelint.utils.report({
              node: decl,
              message: messages.rejected(bannedVar),
              result: postcssResult,
              ruleName
            });
          }
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
