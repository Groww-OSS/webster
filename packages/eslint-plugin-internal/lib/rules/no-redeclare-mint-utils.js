module.exports = {
  meta: {
    docs: {
      description: "Disallow declaration of specific CSS utility classes",
    },
    type: "problem",
    schema: [
      {
        type: "object",
        properties: {
          tokens: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      disallowedCssClassDeclaration: "Declaration of the CSS class '{{ className }}' is disallowed.",
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const disallowedClasses = options.tokens || [];

    const cssClassDeclarationPattern = (className) =>
      new RegExp(`\\.${className}\\s*{`, "i");

    function checkCSSClassDeclarations(value, node) {
      disallowedClasses.forEach((className) => {
        if (cssClassDeclarationPattern(className).test(value)) {
          context.report({
            node,
            messageId: "disallowedCssClassDeclaration",
            data: { className },
          });
        }
      });
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkCSSClassDeclarations(node.value, node);
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          checkCSSClassDeclarations(quasi.value.raw, quasi);
        });
      },
    };
  },
};
