module.exports = {
    meta: {
      docs: {
        description: "Disallow declaration of specific CSS classes",
      },
      messages: {
        disallowedCssClassDeclaration: "Declaration of the CSS class '{{ className }}' is disallowed.",
      },
    },
  
    create(context) {
      // List of disallowed CSS class names
      const disallowedClasses = ["contentPrimary", "borderAccent", "backgroundPrimary"];
  
      const cssClassDeclarationPattern = (className) => new RegExp(`\\.${className}\\s*{`, "i");
  
      function checkCSSClassDeclarations(node) {
        if (typeof node.value === "string") {
          disallowedClasses.forEach((className) => {
            if (cssClassDeclarationPattern(className).test(node.value)) {
              context.report({
                node,
                messageId: "disallowedCssClassDeclaration",
                data: { className },
              });
            }
          });
        }
      }
  
      return {
        Literal(node) {
          checkCSSClassDeclarations(node);
        },
        TemplateLiteral(node) {
          node.quasis.forEach((quasi) => {
            disallowedClasses.forEach((className) => {
              if (cssClassDeclarationPattern(className).test(quasi.value.raw)) {
                context.report({
                  node: quasi,
                  messageId: "disallowedCssClassDeclaration",
                  data: { className },
                });
              }
            });
          });
        },
      };
    },
  };
  