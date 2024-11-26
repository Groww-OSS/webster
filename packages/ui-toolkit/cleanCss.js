const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

/**
 * Cleans up CSS files in a given directory based on property-variable mappings and specific class names.
 * @param {string} dir - The directory to scan for CSS files.
 * @param {Array} mappings - An array of objects with `cssProperty`, `variable`, and `className` to match for removal.
 */
function cleanupCssFiles(dir, mappings) {
  /**
   * Processes a single CSS file, removing matching declarations based on mappings and class names.
   * @param {string} filePath - The full path of the CSS file.
   */
  function processFile(filePath) {
    try {
      const css = fs.readFileSync(filePath, 'utf8');
      const root = postcss.parse(css);
      let modified = false;

      root.walkRules((rule) => {
        // Check if the rule selector matches any of the specified class names
        const matchingMapping = mappings.find((mapping) =>
          rule.selector.includes(`.${mapping.className}`)
        );

        if (matchingMapping) {
          rule.walkDecls((decl) => {
            // Check if the property and value match
            if (
              decl.prop === matchingMapping.cssProperty &&
              decl.value === matchingMapping.variable
            ) {
              decl.remove(); // Remove the matching declaration
              modified = true;
            }
          });

          // Remove rule if it has no declarations left
          if (rule.nodes.length === 0) {
            rule.remove();
            modified = true;
          }
        }
      });

      if (modified) {
        fs.writeFileSync(filePath, root.toString(), 'utf8');
        console.log(`✅ Cleaned up: ${filePath}`);
      }

    } catch (error) {
      console.error(`❌ Error processing file ${filePath}:`, error.message);
    }
  }

  /**
   * Recursively traverses a directory to process all CSS files.
   * @param {string} currentDir - The directory to traverse.
   */
  function traverseDirectory(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);

      items.forEach((item) => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverseDirectory(fullPath);

        } else if (stat.isFile() && fullPath.endsWith('.css')) {
          processFile(fullPath);
        }
      });

    } catch (error) {
      console.error(`❌ Error traversing directory ${currentDir}:`, error.message);
    }
  }

  // Start traversing from the root directory
  if (fs.existsSync(dir)) {
    traverseDirectory(dir);

  } else {
    console.error(`❌ Directory not found: ${dir}`);
  }
}

try {
  // Load mappings from JSON file
  const mappingsPath = path.join(__dirname, 'mappings.json');

  if (!fs.existsSync(mappingsPath)) {
    throw new Error('Mappings file not found.');
  }

  const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));

  // Clean up CSS files
  const cssDirectory = path.join(__dirname, './src');

  console.log(`🔍 Starting cleanup in directory: ${cssDirectory}`);
  cleanupCssFiles(cssDirectory, mappings);
  console.log('✅ CSS cleanup completed.');

} catch (error) {
  console.error('❌ Initialization error:', error.message);
}
