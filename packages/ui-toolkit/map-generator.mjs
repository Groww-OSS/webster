import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

const propertyVarToUtilityMap = {
  'background-color': {
    'var(--green500)': 'backgroundAccent',
    'var(--gray50)': 'backgroundSecondary',
    'var(--gray100)': 'backgroundTertiary',
    'var(--overlay70)': 'backgroundOverlayPrimary',
    'var(--overlay30)': 'backgroundOverlaySecondary',
    'var(--black)': 'backgroundAlwaysDark',
    'var(--white)': 'backgroundAlwaysLight',
    'var(--red500)': 'backgroundNegative',
    'var(--yellow500)': 'backgroundWarning',
    'var(--yello100)': 'backgroundWarningSubtle',
    'var(--green100)': 'backgroundAccentSubtle',
    'var(--red100)': 'backgroundNegativeSubtle',
    'var(--purple500)': 'backgroundAccentSecondary',
    'var(--purple100)': 'backgroundAccentSecondarySubtle',
  },
  'color': {
    'var(--gray900)': 'contentPrimary',
    'var(--gray700)': 'contentSecondary',
    'var(--gray500)': 'contentTertiary',
    'var(--gray300)': 'contentInverseSecondary',
    'var(--gray400)': 'contentDisabled',
    'var(--white)': 'contentOnColour',
    'var(--green500)': 'contentAccent',
    'var(--red500)': 'contentNegative',
    'var(--yellow500)': 'contentWarning',
    'var(--purple500)': 'contentAccentSecondary',
    'var(--purple300)': 'contentAccentSecondarySubtle'
  },
  'border': {
    '1px solid var(--gray150)': 'borderPrimary',
    '1px solid var(--gray100)': 'borderDisabled',
    '1px solid var(--green500)': 'borderAccent',
    '1px solid var(--red500)': 'borderNegative',
    '1px solid var(--gray900)': 'borderNeutral'
  }
};

// Function for extracting CSS mappings
function extractCssMappings(cssContent, filePath) {
  const mappings = [];
  const root = postcss.parse(cssContent);
  const parentDir = path.dirname(filePath); // Get parent directory path

  root.walkRules(rule => {
    // Skip pseudo-classes, special classes, concatenated classes, and descendant selectors (spaces or newlines)
    if (
      rule.selector.includes(':') ||
      rule.selector.includes('~') ||
      /(\.[a-zA-Z0-9_-]+){2,}/.test(rule.selector) || // Matches concatenated classes
      /[\s]/.test(rule.selector.trim()) // Matches any space, tab, or newline between selectors
    ) {
      return;
    }

    rule.selectors.forEach(selector => {
      if (!selector.startsWith('.')) return; // Skip non-class selectors

      rule.walkDecls(decl => {
        const { prop, value } = decl;

        if (propertyVarToUtilityMap[prop] && propertyVarToUtilityMap[prop][value]) {
          mappings.push({
            cssProperty: prop,
            variable: value,
            className: selector.replace('.', ''), // Strip dot
            semanticUtilClass: propertyVarToUtilityMap[prop][value],
            filePath, // Include full file path
            parentFolderPath: parentDir // Include the parent folder path
          });
        }
      });
    });
  });

  return mappings;
}

// Function for processing CSS files
function processCssFiles(dir) {
  const mappings = [];

  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      mappings.push(...processCssFiles(fullPath));

    } else if (file.endsWith('.css')) {
      const cssContent = fs.readFileSync(fullPath, 'utf8');
      const relativePath = path.relative(process.cwd(), fullPath); // Get relative file path

      mappings.push(...extractCssMappings(cssContent, relativePath));
    }
  });

  return mappings;
}

// Entry point
(async () => {
  try {
    const cssMappings = processCssFiles('./src'); // Adjust root directory as needed

    fs.writeFileSync('mappings.json', JSON.stringify(cssMappings, null, 2));
    console.log('CSS mappings saved to mappings.json');

  } catch (error) {
    console.error('Error processing CSS files:', error);
  }
})();
