module.exports = {
  meta: {
    docs: {
      description: "Disallow usage of specific hardcoded CSS variables",
    },
    messages: {
      disallowedCssVar: "Usage of CSS variable '{{ variable }}' is disallowed.",
    },
  },

  create(context) {
    const disallowedVariables = ["--green500", "--gray900", "--red500"];

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          disallowedVariables.forEach((variable) => {
            const cssVarPattern = new RegExp(`var\\(${variable}\\)`, "i"); 
            if (cssVarPattern.test(node.value)) {
              context.report({
                node,
                messageId: "disallowedCssVar",
                data: { variable },
              });
            }
          });
        }
      },
    };
  },
};
