import { RuleTester } from "eslint";
import rule from "../../../lib/rules/no-redeclare-mint-tokens.js";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

ruleTester.run("no-redeclare-mint-tokens", rule, {
  valid: [
    // Using variables (not declaring them)
    `const styles = "var(--green500)";`,
    `const styles = "color: var(--gray900)";`,
    `const styles = "background: var(--red500)";`,
    
    // Different variable declarations
    `const styles = "--blue500: #3B82F6";`,
    `const styles = "--primary: #000000";`,
    
    // Template literals using variables
    `const styles = \`color: var(--green500)\`;`,
    
    // Multi-line template literals using variables
    `const styles = \`
      .className {
        color: var(--gray900);
        background: var(--red500);
      }
    \`;`,
    
    // Just variable names without declarations
    `const varName = "--green500";`,
    `const colors = ["--gray900", "--red500"];`,
  ],

  invalid: [
    // Simple string declarations
    {
      code: `const styles = "--green500: #10B981";`,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "green500" }
      }],
    },
    {
      code: `const styles = "--gray900: #111827";`,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "gray900" }
      }],
    },
    {
      code: `const styles = "--red500: #EF4444";`,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "red500" }
      }],
    },

    // Case insensitive tests
    {
      code: `const styles = "--GREEN500: #10B981";`,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "green500" }
      }],
    },

    // Template literal declarations
    {
      code: `const styles = \`--green500: #10B981;\`;`,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "green500" }
      }],
    },

    // Multi-line template literals
    {
      code: `
        const styles = \`
          .className {
            --gray900: #111827;
            color: black;
          }
        \`;
      `,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "gray900" }
      }],
    },

    // Multiple declarations in template literal
    {
      code: `
        const styles = \`
          .className {
            --green500: #10B981;
            --red500: #EF4444;
          }
        \`;
      `,
      errors: [
        { 
          messageId: "disallowedCssVarDeclaration",
          data: { variable: "green500" }
        },
        { 
          messageId: "disallowedCssVarDeclaration",
          data: { variable: "red500" }
        }
      ],
    },

    // Dynamic values in template literals
    {
      code: `const styles = \`--green500: \${someValue};\`;`,
      errors: [{ 
        messageId: "disallowedCssVarDeclaration",
        data: { variable: "green500" }
      }],
    },
  ],
});