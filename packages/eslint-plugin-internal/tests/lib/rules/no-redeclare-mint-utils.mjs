import { RuleTester } from "eslint";
import rule from "../../../lib/rules/no-redeclare-mint-utils.js";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

ruleTester.run("no-redeclare-mint-utils", rule, {
  valid: [
    // Regular class names that are allowed
    `const styles = ".primaryContent { color: blue; }";`,
    `const styles = ".accent-border { border: 1px solid black; }";`,
    `const styles = ".primary-background { background: white; }";`,
    
    // Using different class names
    `const styles = ".customClass { color: blue; }";`,
    `const styles = ".userProfile { background: white; }";`,
    
    // Template literals with allowed class names
    `const styles = \`.allowedClass { color: blue; }\`;`,
    
    // Multi-line template literals with allowed classes
    `const styles = \`
      .validClass {
        color: blue;
        background: white;
      }
    \`;`,
    
    // Just class names without declarations
    `const className = "contentPrimary";`,
    `const classes = ["borderAccent", "backgroundPrimary"];`,
  ],

  invalid: [
    // Simple string declarations
    {
      code: `const styles = ".contentPrimary { color: blue; }";`,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "contentPrimary" }
      }],
    },
    {
      code: `const styles = ".borderAccent { border: 1px solid black; }";`,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "borderAccent" }
      }],
    },
    {
      code: `const styles = ".backgroundPrimary { background: white; }";`,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "backgroundPrimary" }
      }],
    },

    // Case insensitive tests
    {
      code: `const styles = ".CONTENTPRIMARY { color: blue; }";`,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "contentPrimary" }
      }],
    },

    // Template literal declarations
    {
      code: `const styles = \`.contentPrimary { color: blue; }\`;`,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "contentPrimary" }
      }],
    },

    // Multi-line template literals
    {
      code: `
        const styles = \`
          .borderAccent {
            border: 1px solid black;
            color: blue;
          }
        \`;
      `,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "borderAccent" }
      }],
    },

    // Multiple declarations in template literal
    {
      code: `
        const styles = \`
          .contentPrimary {
            color: blue;
          }
          .backgroundPrimary {
            background: white;
          }
        \`;
      `,
      errors: [
        { 
          messageId: "disallowedCssClassDeclaration",
          data: { className: "contentPrimary" }
        },
        { 
          messageId: "disallowedCssClassDeclaration",
          data: { className: "backgroundPrimary" }
        }
      ],
    },

    // Dynamic values in template literals
    {
      code: `const styles = \`.contentPrimary { color: \${someValue}; }\`;`,
      errors: [{ 
        messageId: "disallowedCssClassDeclaration",
        data: { className: "contentPrimary" }
      }],
    },
  ],
});