module.exports = {
    meta: {
      docs: {
        description: "Disallow usage of GCS bucket URLs containing storage.googleapis.com",
      },
      messages: {
        disallowedUrl: "Bucket URLs are disallowed. Use CDN URL instead.",
      },
    },
  
    create(context) {
      // Pattern to detect URLs containing 'storage.googleapis.com'
      const disallowedPattern = /https?:\/\/[^'"\s]*storage\.googleapis\.com[^'"\s]*/i;
  
      return {
        Literal(node) {
          if (typeof node.value === "string" && disallowedPattern.test(node.value)) {
            context.report({
              node, // node to flag
              messageId: "disallowedUrl", // Error message
            });
          }
        },
      };
    },
};