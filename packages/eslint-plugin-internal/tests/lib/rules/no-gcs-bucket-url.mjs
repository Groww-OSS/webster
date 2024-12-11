import { RuleTester } from "eslint";
import typescriptEslintParser from "@typescript-eslint/parser";

import rule from "../../../lib/rules/no-gcs-bucket-url.js";

// Initialize the RuleTester with the correct parser
const ruleTester = new RuleTester({ parser: typescriptEslintParser });

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
