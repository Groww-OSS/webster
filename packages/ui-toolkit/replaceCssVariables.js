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
  'border': {
    'var(--gray150)': 'var(--border-primary)',
    'var(--gray300)': 'var(--border-disabled)',
    'var(--red500)': 'var(--border-accent)',
    'var(--yellow500)': 'var(--border-negative)',
    'var(--gray900)': 'var(--border-neutral)'
  }
};

// Border-related properties to check
const borderProperties = [
  'border',
  'border-color',
  'border-top',
  'border-top-color',
  'border-right',
  'border-right-color',
  'border-bottom',
  'border-bottom-color',
  'border-left',
  'border-left-color',
  'border-block',
  'border-block-color',
  'border-inline',
  'border-inline-color',
  'outline',
  'outline-color'
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
    Object.entries(propertyVarToUtilityMap['background-color']).forEach(([ primitive, semantic ]) => {
      const regex = new RegExp(`background-color:\\s*${escapeRegExp(primitive)}`, 'g');

      content = content.replace(regex, `background-color: ${semantic}`);
    });

    // Replace color variables
    Object.entries(propertyVarToUtilityMap.color).forEach(([ primitive, semantic ]) => {
      const regex = new RegExp(`color:\\s*${escapeRegExp(primitive)}`, 'g');

      content = content.replace(regex, `color: ${semantic}`);
    });

    // Replace border color variables
    borderProperties.forEach(prop => {
      Object.entries(propertyVarToUtilityMap.border).forEach(([ primitive, semantic ]) => {
        // Match various border color scenarios
        const regexPatterns = [
          new RegExp(`${prop}:[^;]*${escapeRegExp(primitive)}`, 'g'),
          new RegExp(`${prop}:\\s*\\d+px\\s+solid\\s*${escapeRegExp(primitive)}`, 'g')
        ];

        regexPatterns.forEach(regex => {
          content = content.replace(regex, match => {
            return match.replace(primitive, semantic);
          });
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
  return string.replace(/[.*+?^${}()|\[\]\/\\]/g, '\\$&');
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
