const fs = require('fs');
const path = require('path');

// Mapping of primitive to semantic variables
const propertyVarToUtilityMap = {
  'background-color': {
    'var( --dangerouslySetPrimaryBg)': 'var(--background-primary)',
    'var(--green500)': 'var(--background-accent)',
    'var(--gray50)': 'var(--background-secondary)',
    'var(--gray100)': 'var(--background-tertiary)',
    'var(--overlay70)': 'var(--background-overlay-primary)',
    'var(--overlay30)': 'var(--background-overlay-secondary)',
    'var(--black)': 'var(--background-always-dark)',
    'var(--white)': 'var(--background-always-light)',
    'var(--red500)': 'var(--background-negative)',
    'var(--yellow500)': 'var(--background-warning)',
    'var(--yello100)': 'var(--background-warning-subtle)',
    'var(--green100)': 'var(--background-accent-subtle)',
    'var(--green300)': 'var(--background-accent-subtle)',
    'var(--red100)': 'var(--background-negative-subtle)',
    'var(--yellow100)': 'var(--background-warning-subtle)',
    'var(--purple500)': 'var(--background-accent-secondary)',
    'var(--purple100)': 'var(--background-accent-secondary-subtle)',
    'var(--gray900)': 'var(--background-inverse-primary)'
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
    'var(--purple300)': 'var(--content-accent-secondary-subtle)',
    'var(--gray600)': 'var(--content-tertiary)',
    'var(--gray800)': 'var(--content-secondary)'
  },
  'border': {
    'var(--gray150)': 'var(--border-primary)',
    'var(--gray100)': 'var(--border-disabled)',
    'var(--green500)': 'var(--border-accent)',
    'var(--red500)': 'var(--border-negative)',
    'var(--gray900)': 'var(--border-neutral)',
    'var(--gray200)': 'var(--border-primary)'
  }
};

// Properties to check for background-related styles
const backgroundProperties = [
  'background', 'background-color', 'background-image', 'background-blend-mode'
];

// Properties to check for color-related styles
const colorProperties = [
  'color', 'text-shadow', 'fill', 'stroke', 'stroke-width', 'box-shadow', 'caret-color'
];

// Properties to check for border-related styles
const borderProperties = [
  'border', 'border-color', 'border-width', 'border-style',
  'border-top', 'border-top-color', 'border-top-width', 'border-top-style',
  'border-right', 'border-right-color', 'border-right-width', 'border-right-style',
  'border-bottom', 'border-bottom-color', 'border-bottom-width', 'border-bottom-style',
  'border-left', 'border-left-color', 'border-left-width', 'border-left-style',
  'border-block', 'border-block-color', 'border-block-width', 'border-block-style',
  'border-inline', 'border-inline-color', 'border-inline-width', 'border-inline-style',
  'outline', 'outline-color', 'outline-width', 'outline-style',
  'box-shadow'
];

/**
 * Replace variables in a single CSS file
 * @param {string} filePath - Path to the CSS file
 */
function replaceCSSVariables(filePath) {
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace background-color variables
    backgroundProperties.forEach(prop => {
      Object.entries(propertyVarToUtilityMap['background-color']).forEach(([ primitive, semantic ]) => {
        const regex = new RegExp(`${prop}:[^;]*${escapeRegExp(primitive)}`, 'g');

        content = content.replace(regex, match => match.replace(primitive, semantic));
      });
    });

    // Replace color variables
    colorProperties.forEach(prop => {
      Object.entries(propertyVarToUtilityMap.color).forEach(([ primitive, semantic ]) => {
        const regex = new RegExp(`${prop}:[^;]*${escapeRegExp(primitive)}`, 'g');

        content = content.replace(regex, match => match.replace(primitive, semantic));
      });
    });

    // Replace border color variables
    borderProperties.forEach(prop => {
      Object.entries(propertyVarToUtilityMap.border).forEach(([ primitive, semantic ]) => {
        const regexPatterns = [
      // Matches cases where the primitive is in a border declaration
          new RegExp(`${prop}:[^;]*${escapeRegExp(primitive)}`, 'g'),
      // Matches declarations with optional width, style, and color in any order
          new RegExp(
            `${prop}:\\s*(\\d+px\\s+)?(\\w+\\s+)?${escapeRegExp(primitive)}|${escapeRegExp(primitive)}\\s+(\\w+\\s+)?(\\d+px)?`,
            'g'
          )
        ];

        regexPatterns.forEach(regex => {
          content = content.replace(regex, match => match.replace(primitive, semantic));
        });
      });
    });


    // Write the modified content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filePath}`);

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
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
 * Recursively process CSS files in a directory
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

    } else if (path.extname(file).toLowerCase() === '.css') {
      // Process CSS files
      replaceCSSVariables(fullPath);
    }
  });
}

// Usage
const directoryPath = process.argv[2] || './src'; // Default to './src' if no path provided

console.log(`Starting variable replacement in: ${directoryPath}`);
processDirectory(directoryPath);
console.log('Variable replacement complete.');
