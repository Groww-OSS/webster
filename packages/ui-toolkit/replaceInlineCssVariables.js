const fs = require('fs');
const path = require('path');

// Mapping of primitive to semantic variables
const propertyVarToUtilityMap = {
  'background-color': {
    'var(--green500)': 'var(--background-accent)',
    'var(--gray50)': 'var(--background-secondary)',
    'var(--gray100)': 'var(--background-tertiary)',
    'var(--overlay70)': 'var(--background-overlay-primary)',
    'var(--overlay30)': 'var(--background-overlay-secondary)',
    'var(--black)': 'var(--background-always-dark)',
    'var(--white)': 'var(--background-always-light)',
    'var(--red500)': 'var(--background-negative)',
    'var(--green100)': 'var(--background-accent-subtle)',
    'var(--red100)': 'var(--background-negative-subtle)',
    'var(--yellow100)': 'var(--background-warning-subtle)',
    'var(--purple500)': 'var(--background-accent-secondary)',
    'var(--purple100)': 'var(--background-accent-secondary-subtle)'
  },
  'color': {
    'var(--gray900)': 'var(--content-primary)',
    'var(--gray700)': 'var(--content-secondary)',
    'var(--gray500)': 'var(--content-tertiary)',
    'var(--gray300)': 'var(--content-inverse-secondary)',
    'var(--gray400)': 'var(--content-disabled)',
    'var(--white)': 'var(--content-on-color)',
    'var(--green500)': 'var(--content-accent)',
    'var(--red500)': 'var(--content-negative)',
    'var(--yellow500)': 'var(--content-warning)',
    'var(--purple500)': 'var(--content-accent-secondary)',
    'var(--purple300)': 'var(--content-accent-secondary-subtle)'
  },
  'border-color': {
    'var(--gray150)': 'var(--border-primary)',
    'var(--gray300)': 'var(--border-disabled)',
    'var(--red500)': 'var(--border-accent)',
    'var(--yellow500)': 'var(--border-negative)',
    'var(--gray900)': 'var(--border-neutral)'
  }
};

// Arrays of properties for different categories
const backgroundProperties = ['background', 'backgroundColor'];
const colorProperties = ['color', 'textColor'];
const borderProperties = [
  'border', 'borderColor',
  'borderTopColor', 'borderRightColor',
  'borderBottomColor', 'borderLeftColor',
  'outlineColor'
];

/**
 * Replace variables in a single file
 * @param {string} filePath - Path to the file
 */
function replaceCSSVariables(filePath) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace background-related variables
    content = replaceVariables(content, backgroundProperties, 'background-color');
    // Replace color-related variables
    content = replaceVariables(content, colorProperties, 'color');
    // Replace border-related variables
    content = replaceVariables(content, borderProperties, 'border-color');

    // Write the modified content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

/**
 * Replace variables for a specific category of properties
 * @param {string} content - File content
 * @param {Array} properties - Array of property names to replace
 * @param {string} cssProperty - Key from the mapping to use for replacement
 * @returns {string} Modified content
 */
function replaceVariables(content, properties, cssProperty) {
  properties.forEach(property => {
    Object.entries(propertyVarToUtilityMap[cssProperty]).forEach(([primitive, semantic]) => {
      // 1. Handle JS/TS object syntax (e.g., backgroundColor: 'var(--green500)')
      const jsObjectRegex = new RegExp(`(${property}):\\s*['"\`]${escapeRegExp(primitive)}['"\`]`, 'g');

      // 2. Handle JSX/TSX inline prop (e.g., backgroundColor="var(--green500)" or backgroundColor={'var(--green500)'})
      const jsxPropRegex = new RegExp(`${property}=\\s*{?['"\`]${escapeRegExp(primitive)}['"\`]}?`, 'g');

      // Replace key-value pairs
      content = content.replace(jsObjectRegex, match => match.replace(primitive, semantic));

      // Replace inline JSX/TSX props
      content = content.replace(jsxPropRegex, match => match.replace(primitive, semantic));
    });
  });
  return content;
}

/**
 * Escape special characters in regex
 * @param {string} string - String to escape
 * @returns {string} Escaped string
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Recursively process files in a directory
 * @param {string} dirPath - Path to the directory
 */
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(fullPath);
    } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(file).toLowerCase())) {
      // Process files with supported extensions
      replaceCSSVariables(fullPath);
    }
  });
}

// Usage
const directoryPath = process.argv[2] || './src'; // Default to './src' if no path provided
console.log(`Starting variable replacement in: ${directoryPath}`);
processDirectory(directoryPath);
console.log('Variable replacement complete.');
