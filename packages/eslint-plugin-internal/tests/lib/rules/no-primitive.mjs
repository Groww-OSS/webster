import { RuleTester } from "eslint";

import rule from "../../../lib/rules/no-primitive.js";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

ruleTester.run("no-primitive", rule, {
  valid: [
    // Cases where the CSS variables are not disallowed
    `const styles = "color: var(--blue500);";`,
    `const styles = "background: var(--allowed-color);";`,
    `const styles = "font-size: var(--font-size-large);";`,
  ],

  invalid: [
    {
      code: `const styles = "color: var(--green500);";`,
      errors: [{ messageId: "disallowedCssVar", data: { variable: "green500" } }],
    },
    {
      code: `const styles = "background: var(--gray900);";`,
      errors: [{ messageId: "disallowedCssVar", data: { variable: "gray900" } }],
    },
    {
      code: `const styles = "border-color: var(--red500);";`,
      errors: [{ messageId: "disallowedCssVar", data: { variable: "red500" } }],
    },
  ],
});
