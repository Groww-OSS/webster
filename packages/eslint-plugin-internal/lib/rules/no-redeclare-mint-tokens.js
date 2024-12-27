module.exports = {
  meta: {
    docs: {
      description: "Disallow declaration of mint tokens",
    },
    messages: {
      disallowedCssVarDeclaration: "Declaration of CSS variable '{{ variable }}' is disallowed.",
    },
  },

  create(context) {
    const disallowedVariables = ["green500", "gray900", "red500"];
    const cssVarDeclarationPattern = (variable) => new RegExp(`--${variable}\\s*:\\s*`, "i");

    function checkCSSDeclarations(node) {
      if (typeof node.value === "string") {
        disallowedVariables.forEach((variable) => {
          if (cssVarDeclarationPattern(variable).test(node.value)) {
            context.report({
              node,
              messageId: "disallowedCssVarDeclaration",
              data: { variable },
            });
          }
        });
      }
    }

    return {
      Literal(node) {
        checkCSSDeclarations(node);
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          disallowedVariables.forEach((variable) => {
            if (cssVarDeclarationPattern(variable).test(quasi.value.raw)) {
              context.report({
                node: quasi,
                messageId: "disallowedCssVarDeclaration",
                data: { variable },
              });
            }
          });
        });
      },
    };
  },
};
