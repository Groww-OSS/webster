import { RuleTester } from "eslint";

import rule from "../../../lib/rules/no-gcs-bucket-url.js";

// Initialize the RuleTester with proper parserOptions
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

// Define test cases for the rule
ruleTester.run("no-gcs-bucket-url", rule, {
  valid: [
    `const url = "https://cdn.example.com/bucket/file.jpg";`
  ],

  invalid: [
    {
      code: `const url = "https://storage.googleapis.com/bucket/file.jpg";`,
      errors: [{ messageId: "disallowedUrl" }],
    },
  ],
});
