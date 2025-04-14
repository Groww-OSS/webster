module.exports = {
  meta: {
    docs: {
      description: "Disallow usage of specific hardcoded CSS variables",
    },
    messages: {
      disallowedCssVar: "Usage of CSS variable '{{ variable }}' is disallowed.",
    },
    schema: [
      {
        type: "object",
        properties: {
          primitiveTokens: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const disallowedVariables = options.primitiveTokens || [];

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          disallowedVariables.forEach((variable) => {
            const cssVarPattern = new RegExp(`var\\(--?${variable}\\)`, "i");
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
