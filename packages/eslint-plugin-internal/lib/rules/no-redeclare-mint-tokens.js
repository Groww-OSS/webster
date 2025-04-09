module.exports = {
  meta: {
    docs: {
      description: "Disallow declaration of mint tokens",
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
      disallowedCssVarDeclaration: "Declaration of CSS variable '{{ variable }}' is disallowed.",
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const disallowedVariables = options.tokens || [];
    const cssVarDeclarationPattern = (variable) => new RegExp(`\\b${variable}\\s*:\\s*`, "i");

    function checkCSSDeclarations(value, node) {
      disallowedVariables.forEach((variable) => {
        if (cssVarDeclarationPattern(variable).test(value)) {
          context.report({
            node,
            messageId: "disallowedCssVarDeclaration",
            data: { variable },
          });
        }
      });
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkCSSDeclarations(node.value, node);
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          checkCSSDeclarations(quasi.value.raw, quasi);
        });
      },
    };
  },
};
