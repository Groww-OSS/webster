import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

// Import JSON data directly (using dynamic import in ES modules)
import jsonData from './updatedMappings.json' assert { type: 'json' };

/**
 * Cleans up a specific CSS property and removes the rule if it becomes empty.
 * @param {Object} mapping - The mapping object with details for cleanup.
 */
async function cleanupSpecificCss(mapping) {
  const { cssProperty, variable, className, filePath, classNameOccurrences } = mapping;

  // Only perform cleanup if classNameOccurrences is 1
  if (classNameOccurrences !== 1) {
    console.log(`⚠️ Skipping cleanup for ${className} as occurrences is not 1.`);
    return;
  }

  if (!cssProperty || !variable || !className || !filePath) {
    console.error('❌ Missing required mapping fields.');
    return;
  }

  const absoluteFilePath = path.resolve(filePath);

  try {
    if (!fs.existsSync(absoluteFilePath)) {
      console.error(`❌ File not found: ${absoluteFilePath}`);
      return;
    }

    const css = fs.readFileSync(absoluteFilePath, 'utf8');
    const root = postcss.parse(css);
    let modified = false;

    root.walkRules((rule) => {
      // Match the specific class selector
      if (rule.selector === `.${className}`) {
        rule.walkDecls((decl) => {
          // Match the property and value to be removed
          if (decl.prop === cssProperty && decl.value === variable) {
            decl.remove();
            modified = true;
          }
        });

        // // Remove the rule entirely if no declarations remain
        // if (rule.nodes.length === 0) {
        //   rule.remove();
        //   modified = true;
        // }
      }
    });

    // Write changes back to the file if modified
    if (modified) {
      fs.writeFileSync(absoluteFilePath, root.toString(), 'utf8');
      console.log(`✅ Cleaned up: ${absoluteFilePath}`);
    } else {
      console.log(`ℹ️ No matching declarations found in: ${absoluteFilePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing file ${absoluteFilePath}:`, error.message);
  }
}

// Loop through each mapping and clean up the corresponding CSS file
jsonData.forEach(mapping => {
  cleanupSpecificCss(mapping);
});
