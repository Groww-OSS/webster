import { RuleTester } from "eslint";

import rule from "../../../lib/rules/no-gcs-bucket-url.js";

// Initialize the RuleTester with proper parserOptions
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021, // Support for ES2021 syntax, including modern js
    sourceType: "module", // allow use of ES modules
  },
});

// Define test cases for the rule
ruleTester.run("no-gcs-bucket-url", rule, {
  valid: [
    `const url = "https://cdn.example.com/bucket/file.jpg";` // This should not trigger any error
  ],

  invalid: [
    {
      code: `const url = "https://storage.googleapis.com/bucket/file.jpg";`, // This should trigger an error
      errors: [{ messageId: "disallowedUrl" }], // Expected error message
    },
  ],
});
