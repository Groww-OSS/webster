const fs = require('fs');
const path = require('path');
const config = require('./designSystemConfig');

// ---------- Helper Functions ----------
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

// ---------- Build Group-Specific Primitive Maps ----------

// Global maps for object references are now grouped by primitives group.
const groupPrimitiveRefMap = new Map();
// Similarly, for literal color values we will map per group.
const groupPrimitiveLightLiteralMap = new Map();
const groupPrimitiveDarkLiteralMap = new Map();

for (const group in config.primitives) {
  const groupData = config.primitives[group];
  // Initialize maps for this group
  const lightMap = new Map();
  const darkMap = new Map();
  const refMap = new Map();
  for (const category in groupData) {
    if (category === 'appendToHtml') continue;
    const tokens = groupData[category];
    for (const tokenName in tokens) {
      const tokenObj = tokens[tokenName];
      // Always map by object reference (for tokens defined as objects)
      refMap.set(tokenObj, toKebabCase(tokenName));
      // Map literal values if available.
      if (tokenObj.light && typeof tokenObj.light === 'string') {
        lightMap.set(tokenObj.light, toKebabCase(tokenName));
      }
      if (tokenObj.dark && typeof tokenObj.dark === 'string') {
        darkMap.set(tokenObj.dark, toKebabCase(tokenName));
      }
    }
  }
  groupPrimitiveRefMap.set(group, refMap);
  groupPrimitiveLightLiteralMap.set(group, lightMap);
  groupPrimitiveDarkLiteralMap.set(group, darkMap);
}

// ---------- CSS Generators ----------

// Generates CSS for primitives (colors) with light and dark themes.
function generatePrimitiveCSS(colors, groupAppend, groupName) {
  let lightCSS = '';
  let darkCSS = '';
  for (const [tokenName, tokenValue] of Object.entries(colors)) {
    const cssVarName = `--${toKebabCase(tokenName)}`;
    if (tokenValue && tokenValue.light && tokenValue.dark) {
      lightCSS += `  ${cssVarName}: ${tokenValue.light};\n`;
      darkCSS += `  ${cssVarName}: ${tokenValue.dark};\n`;
    } else {
      lightCSS += `  ${cssVarName}: ${tokenValue};\n`;
      darkCSS += `  ${cssVarName}: ${tokenValue};\n`;
    }
  }
  if (groupAppend) {
    return `html.${groupName} {\n${lightCSS}}\n\nhtml[data-theme="dark"].${groupName} {\n${darkCSS}}\n`;
  } else {
    return `html {\n${lightCSS}}\n\nhtml[data-theme="dark"] {\n${darkCSS}}\n`;
  }
}

// Generates CSS for semantic tokens.
// Every value is resolved as a CSS variable reference if it matches a primitive within the same group.
function generateTokenCSS(category, tokens, groupAppend, groupName, groupKey) {
  let lightCSS = '';
  let darkCSS = '';
  // Get the group-specific maps
  const refMap = groupPrimitiveRefMap.get(groupKey);
  const lightLiteralMap = groupPrimitiveLightLiteralMap.get(groupKey);
  const darkLiteralMap = groupPrimitiveDarkLiteralMap.get(groupKey);

  // Use the tokens prefix if provided; otherwise, fall back to the category name.
  const semanticPrefix = tokens.prefix ? tokens.prefix : category;

  for (const [tokenName, tokenValue] of Object.entries(tokens)) {
    // Skip the reserved "prefix" property
    if (tokenName === 'prefix') continue;
    
    const cssVarName = `--${toKebabCase(semanticPrefix)}-${toKebabCase(tokenName)}`;
    let lightVal, darkVal;
    if (tokenValue && tokenValue.light && tokenValue.dark) {
      // Resolve light value
      if (typeof tokenValue.light === 'object' && refMap && refMap.has(tokenValue.light)) {
        lightVal = `var(--${refMap.get(tokenValue.light)})`;
      } else if (typeof tokenValue.light === 'string' && lightLiteralMap && lightLiteralMap.has(tokenValue.light)) {
        lightVal = `var(--${lightLiteralMap.get(tokenValue.light)})`;
      } else {
        lightVal = tokenValue.light;
      }
      // Resolve dark value similarly.
      if (typeof tokenValue.dark === 'object' && refMap && refMap.has(tokenValue.dark)) {
        darkVal = `var(--${refMap.get(tokenValue.dark)})`;
      } else if (typeof tokenValue.dark === 'string' && darkLiteralMap && darkLiteralMap.has(tokenValue.dark)) {
        darkVal = `var(--${darkLiteralMap.get(tokenValue.dark)})`;
      } else {
        darkVal = tokenValue.dark;
      }
    } else {
      if (typeof tokenValue === 'string' && lightLiteralMap && lightLiteralMap.has(tokenValue)) {
        lightVal = `var(--${lightLiteralMap.get(tokenValue)})`;
        darkVal = `var(--${darkLiteralMap.get(tokenValue)})`;
      } else {
        lightVal = tokenValue;
        darkVal = tokenValue;
      }
    }
    lightCSS += `  ${cssVarName}: ${lightVal};\n`;
    darkCSS += `  ${cssVarName}: ${darkVal};\n`;
  }
  if (groupAppend) {
    return `html.${groupName} {\n${lightCSS}}\n\nhtml[data-theme="dark"].${groupName} {\n${darkCSS}}\n`;
  } else {
    return `html {\n${lightCSS}}\n\nhtml[data-theme="dark"] {\n${darkCSS}}\n`;
  }
}

// Generates CSS for utility classes.
// The mapping always uses the semantic token keys from the tokens object passed in.
// It attempts to detect the "semantic" category by reference from config.semanticTokens.
// If found, its key is used as the variable prefix for constructing the CSS variable name.
function generateUtilityClassesCSS(prefix, tokensObj, utilConfig = {}) {
  const property = utilConfig.property;
  if (!property) {
    throw new Error(`Utility config for prefix "${utilConfig.prefix}" requires a "property" field.`);
  }
  const pseudo = utilConfig.pseudo || '';

  // Use the "prefix" property from tokensObj if available, otherwise use utilConfig.prefix.
  const variablePrefix = (tokensObj && tokensObj.prefix) ? tokensObj.prefix : utilConfig.prefix;

  let css = '';
  for (const tokenKey in tokensObj) {
    // Skip the reserved "prefix" property so a class is not generated for it.
    if (tokenKey === "prefix") continue;
    const tokenKebab = toKebabCase(tokenKey);
    // Build the class name using the utilConfig.prefix and converting token name to PascalCase.
    const className = utilConfig.prefix + toPascalCase(tokenKebab);
    // Build the CSS variable reference using variablePrefix.
    const cssVarName = `--${toKebabCase(variablePrefix)}-${tokenKebab}`;
    if (property === 'border') {
      css += `.${className}${pseudo} { border: 1px solid var(${cssVarName}); }\n\n`;
    } else {
      css += `.${className}${pseudo} { ${property}: var(${cssVarName}); }\n\n`;
    }
  }
  return css;
}


// ---------- Folder Setup ----------
const distDir = path.join(__dirname, 'theme');
const outputTypes = [
  { name: 'css', base: path.join(distDir, 'css') },
  { name: 'types', base: path.join(distDir, 'types') },
  { name: 'names', base: path.join(distDir, 'names') }
];

const categoryFolderMap = {
  primitives: 'variables',
  semanticTokens: 'tokens',
  utilityClasses: 'utils'
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created folder: ${dir}`);
  }
}

outputTypes.forEach(({ base }) => {
  ensureDir(base);
  Object.values(categoryFolderMap).forEach(sub => {
    ensureDir(path.join(base, sub));
  });
});

let aggregatedPrimitivesAll = [];
let aggregatedSemanticAll = [];
let aggregatedUtilsAll = [];
const aggregatedSemanticByCategory = {};
const aggregatedUtilsByCategory = {};

// ---------- Process Primitives ----------
for (const group in config.primitives) {
  const groupData = config.primitives[group];
  let aggregatedTokens = [];
  const groupAppend = !!groupData.appendToHtml;
  const groupName = toKebabCase(group);
  for (const category in groupData) {
    if (category === 'appendToHtml') continue;
    const tokens = groupData[category];
    const cssContent = generatePrimitiveCSS(tokens, groupAppend, groupName);
    const categoryFolder = toKebabCase(category);
    const cssDir = path.join(distDir, 'css', categoryFolderMap.primitives, toKebabCase(group));
    ensureDir(cssDir);
    fs.writeFileSync(path.join(cssDir, `${categoryFolder}.css`), cssContent);
    console.log(`Generated CSS for primitives group: ${group}, category: ${category}`);

    const tokenNames = Object.keys(tokens).map(toKebabCase).sort();
    aggregatedTokens = aggregatedTokens.concat(tokenNames);

    const tsContent = `// Auto-generated types for ${group} primitives (${category})
export const ${group.replace(/\W/g, '')}${toPascalCase(category)}PrimitiveTokens = ${JSON.stringify(tokenNames, null, 2)} as const;
export type ${group.replace(/\W/g, '')}${toPascalCase(category)}PrimitiveToken = typeof ${group.replace(/\W/g, '')}${toPascalCase(category)}PrimitiveTokens[number];
`;
    const tsDir = path.join(distDir, 'types', categoryFolderMap.primitives, toKebabCase(group));
    ensureDir(tsDir);
    fs.writeFileSync(path.join(tsDir, `${categoryFolder}-types.d.ts`), tsContent);
    console.log(`Generated TS types for primitives group: ${group}, category: ${category}`);

    // Names file: Converted to CommonJS format
    const namesContent = `// Auto-generated names for ${group} primitives (${category})
module.exports = ${JSON.stringify(tokenNames, null, 2)};
`;
    const namesDir = path.join(distDir, 'names', categoryFolderMap.primitives, toKebabCase(group));
    ensureDir(namesDir);
    fs.writeFileSync(path.join(namesDir, `${categoryFolder}-names.js`), namesContent);
    console.log(`Generated names file for primitives group: ${group}, category: ${category}`);
  }
  aggregatedTokens = Array.from(new Set(aggregatedTokens)).sort();
  aggregatedPrimitivesAll = aggregatedPrimitivesAll.concat(aggregatedTokens);
  
  const aggTsContent = `// Auto-generated aggregated types for ${group} primitives
export const ${group.replace(/\W/g, '')}PrimitiveTokens = ${JSON.stringify(aggregatedTokens, null, 2)} as const;
export type ${group.replace(/\W/g, '')}PrimitiveToken = typeof ${group.replace(/\W/g, '')}PrimitiveTokens[number];
`;
  fs.writeFileSync(path.join(distDir, 'types', categoryFolderMap.primitives, toKebabCase(group), 'primitives-types.d.ts'), aggTsContent);
  
  const aggNamesContent = `// Auto-generated aggregated names for ${group} primitives
module.exports = ${JSON.stringify(aggregatedTokens, null, 2)};
`;
  fs.writeFileSync(path.join(distDir, 'names', categoryFolderMap.primitives, toKebabCase(group), 'primitives-names.js'), aggNamesContent);
  console.log(`Generated aggregated TS types and names for primitives group: ${group}`);
}

// ---------- Process Semantic Tokens ----------
for (const group in config.semanticTokens) {
  const groupData = config.semanticTokens[group];
  let aggregatedTokens = [];
  const groupAppend = !!(config.primitives[group] && config.primitives[group].appendToHtml);
  const groupName = toKebabCase(group);
  for (const tokenCategory in groupData) {
    if (tokenCategory === 'appendToHtml') continue;
    
    const tokens = groupData[tokenCategory];
    // Generate CSS for semantic tokens; note that generateTokenCSS uses the tokens.prefix logic.
    const cssContent = generateTokenCSS(tokenCategory, tokens, groupAppend, groupName, group);
    const categoryFolder = toKebabCase(tokenCategory);
    const cssDir = path.join(distDir, 'css', categoryFolderMap.semanticTokens, toKebabCase(group));
    ensureDir(cssDir);
    fs.writeFileSync(path.join(cssDir, `${categoryFolder}.css`), cssContent);
    console.log(`Generated CSS for semantic tokens group: ${group}, category: ${tokenCategory}`);

    // Use the same prefixing logic for names generation.
    const semanticPrefix = tokens.prefix ? tokens.prefix : tokenCategory;
    let tokenNames = [];
    for (const token in tokens) {
      if (token === 'prefix') continue;
      tokenNames.push(`${toKebabCase(semanticPrefix)}-${toKebabCase(token)}`);
    }
    tokenNames.sort();
    aggregatedTokens = aggregatedTokens.concat(tokenNames);
    aggregatedSemanticAll = aggregatedSemanticAll.concat(tokenNames);

    const categoryKey = toKebabCase(tokenCategory);
    if (!aggregatedSemanticByCategory[categoryKey]) {
      aggregatedSemanticByCategory[categoryKey] = [];
    }
    aggregatedSemanticByCategory[categoryKey] = aggregatedSemanticByCategory[categoryKey].concat(tokenNames);
    
    const tsContent = `// Auto-generated types for ${group} semantic tokens (${tokenCategory})
export const ${group.replace(/\W/g, '')}${toPascalCase(tokenCategory)}SemanticTokens = ${JSON.stringify(tokenNames, null, 2)} as const;
export type ${group.replace(/\W/g, '')}${toPascalCase(tokenCategory)}SemanticToken = typeof ${group.replace(/\W/g, '')}${toPascalCase(tokenCategory)}SemanticTokens[number];
`;
    const tsDir = path.join(distDir, 'types', categoryFolderMap.semanticTokens, toKebabCase(group));
    ensureDir(tsDir);
    fs.writeFileSync(path.join(tsDir, `${categoryFolder}-types.d.ts`), tsContent);
    console.log(`Generated TS types for semantic tokens group: ${group}, category: ${tokenCategory}`);

    // Names file: Converted to CommonJS format
    const namesContent = `// Auto-generated names for ${group} semantic tokens (${tokenCategory})
module.exports = ${JSON.stringify(tokenNames, null, 2)};
`;
    const namesDir = path.join(distDir, 'names', categoryFolderMap.semanticTokens, toKebabCase(group));
    ensureDir(namesDir);
    fs.writeFileSync(path.join(namesDir, `${categoryFolder}-names.js`), namesContent);
    console.log(`Generated names file for semantic tokens group: ${group}, category: ${tokenCategory}`);
  }
  aggregatedTokens = Array.from(new Set(aggregatedTokens)).sort();
  const aggTsContent = `// Auto-generated aggregated types for ${group} semantic tokens
export const ${group.replace(/\W/g, '')}SemanticTokens = ${JSON.stringify(aggregatedTokens, null, 2)} as const;
export type ${group.replace(/\W/g, '')}SemanticToken = typeof ${group.replace(/\W/g, '')}SemanticTokens[number];
`;
  fs.writeFileSync(path.join(distDir, 'types', categoryFolderMap.semanticTokens, toKebabCase(group), 'tokens-types.d.ts'), aggTsContent);
  
  const aggNamesContent = `// Auto-generated aggregated names for ${group} semantic tokens
module.exports = ${JSON.stringify(aggregatedTokens, null, 2)};
`;
  fs.writeFileSync(path.join(distDir, 'names', categoryFolderMap.semanticTokens, toKebabCase(group), 'tokens-names.js'), aggNamesContent);
  console.log(`Generated aggregated TS types and names for semantic tokens group: ${group}`);
}

// ---------- Process Utility Classes ----------
for (const group in config.utilityClasses) {
  const groupData = config.utilityClasses[group];
  let aggregatedUtils = [];
  for (const utilKey in groupData) {
    const utilConfig = groupData[utilKey];
    // Note: The tokens object here is expected to be a reference from semanticTokens,
    // e.g. semanticTokens["groww-primary"].bg.
    const cssContent = generateUtilityClassesCSS(utilConfig.prefix, utilConfig.tokens, utilConfig);
    const categoryFolder = toKebabCase(utilKey);
    const cssDir = path.join(distDir, 'css', categoryFolderMap.utilityClasses, toKebabCase(group));
    ensureDir(cssDir);
    fs.writeFileSync(path.join(cssDir, `${categoryFolder}.css`), cssContent);
    console.log(`Generated CSS for utility classes group: ${group}, category: ${utilKey}`);

    let classNames = [];
    for (const tokenKey in utilConfig.tokens) {
      if (tokenKey === 'prefix') continue;
      // Use the same logic as generateUtilityClassesCSS: class name is utilConfig.prefix concatenated with PascalCase(tokenKey)
      const className = utilConfig.prefix + toPascalCase(toKebabCase(tokenKey));
      classNames.push(className);
    }
    classNames.sort();
    aggregatedUtils = aggregatedUtils.concat(classNames);
    aggregatedUtilsAll = aggregatedUtilsAll.concat(classNames);

    const utilKeyKebab = toKebabCase(utilKey);
    if (!aggregatedUtilsByCategory[utilKeyKebab]) {
      aggregatedUtilsByCategory[utilKeyKebab] = [];
    }
    aggregatedUtilsByCategory[utilKeyKebab] = aggregatedUtilsByCategory[utilKeyKebab].concat(classNames);
    
    const tsContent = `// Auto-generated types for ${group} utility classes (${utilKey})
export const ${group.replace(/\W/g, '')}${toPascalCase(utilKey)}UtilityClasses = ${JSON.stringify(classNames, null, 2)} as const;
export type ${group.replace(/\W/g, '')}${toPascalCase(utilKey)}UtilityClass = typeof ${group.replace(/\W/g, '')}${toPascalCase(utilKey)}UtilityClasses[number];
`;
    const tsDir = path.join(distDir, 'types', categoryFolderMap.utilityClasses, toKebabCase(group));
    ensureDir(tsDir);
    fs.writeFileSync(path.join(tsDir, `${categoryFolder}-types.d.ts`), tsContent);
    console.log(`Generated TS types for utility classes group: ${group}, category: ${utilKey}`);

    // Names file: Converted to CommonJS format
    const namesContent = `// Auto-generated names for ${group} utility classes (${utilKey})
module.exports = ${JSON.stringify(classNames, null, 2)};
`;
    const namesDir = path.join(distDir, 'names', categoryFolderMap.utilityClasses, toKebabCase(group));
    ensureDir(namesDir);
    fs.writeFileSync(path.join(namesDir, `${categoryFolder}-names.js`), namesContent);
    console.log(`Generated names file for utility classes group: ${group}, category: ${utilKey}`);
  }
  aggregatedUtils = Array.from(new Set(aggregatedUtils)).sort();
  const aggTsContent = `// Auto-generated aggregated types for ${group} utility classes
export const ${group.replace(/\W/g, '')}UtilityClasses = ${JSON.stringify(aggregatedUtils, null, 2)} as const;
export type ${group.replace(/\W/g, '')}UtilityClass = typeof ${group.replace(/\W/g, '')}UtilityClasses[number];
`;
  fs.writeFileSync(path.join(distDir, 'types', categoryFolderMap.utilityClasses, toKebabCase(group), 'utils-types.d.ts'), aggTsContent);
  
  const aggNamesContent = `// Auto-generated aggregated names for ${group} utility classes
module.exports = ${JSON.stringify(aggregatedUtils, null, 2)};
`;
  fs.writeFileSync(path.join(distDir, 'names', categoryFolderMap.utilityClasses, toKebabCase(group), 'utils-names.js'), aggNamesContent);
  console.log(`Generated aggregated TS types and names for utility classes group: ${group}`);
}

aggregatedPrimitivesAll = Array.from(new Set(aggregatedPrimitivesAll)).sort();
aggregatedSemanticAll = Array.from(new Set(aggregatedSemanticAll)).sort();
aggregatedUtilsAll = Array.from(new Set(aggregatedUtilsAll)).sort();

for (const categoryKey in aggregatedSemanticByCategory) {
  aggregatedSemanticByCategory[categoryKey] = Array.from(new Set(aggregatedSemanticByCategory[categoryKey])).sort();
}

for (const utilKey in aggregatedUtilsByCategory) {
  aggregatedUtilsByCategory[utilKey] = Array.from(new Set(aggregatedUtilsByCategory[utilKey])).sort();
}

// ---------- Generate Overall Aggregated Files ----------
const primitivesAllTsPath = path.join(distDir, 'types', categoryFolderMap.primitives, 'all-primitives-types.d.ts');
const semanticAllTsPath = path.join(distDir, 'types', categoryFolderMap.semanticTokens, 'all-semantic-tokens-types.d.ts');
const utilsAllTsPath = path.join(distDir, 'types', categoryFolderMap.utilityClasses, 'all-utils-types.d.ts');

const primitivesAllTsContent = `// Auto-generated aggregated types for all primitives
export const allPrimitiveTokens = ${JSON.stringify(aggregatedPrimitivesAll, null, 2)} as const;
export type AllPrimitiveToken = typeof allPrimitiveTokens[number];
`;
fs.writeFileSync(primitivesAllTsPath, primitivesAllTsContent);

const semanticAllTsContent = `// Auto-generated aggregated types for all semantic tokens
export const allSemanticTokens = ${JSON.stringify(aggregatedSemanticAll, null, 2)} as const;
export type AllSemanticToken = typeof allSemanticTokens[number];
`;
fs.writeFileSync(semanticAllTsPath, semanticAllTsContent);

const utilsAllTsContent = `// Auto-generated aggregated types for all utility classes
export const allUtilityClasses = ${JSON.stringify(aggregatedUtilsAll, null, 2)} as const;
export type AllUtilityClass = typeof allUtilityClasses[number];
`;
fs.writeFileSync(utilsAllTsPath, utilsAllTsContent);

console.log("Generated overall aggregated TS types files for primitives, semantic tokens, and utility classes.");

// For Names
const primitivesAllNamesPath = path.join(distDir, 'names', categoryFolderMap.primitives, 'all-primitives-names.js');
const semanticAllNamesPath = path.join(distDir, 'names', categoryFolderMap.semanticTokens, 'all-semantic-tokens-names.js');
const utilsAllNamesPath = path.join(distDir, 'names', categoryFolderMap.utilityClasses, 'all-utils-names.js');

const primitivesAllNamesContent = `// Auto-generated aggregated names for all primitives
module.exports = ${JSON.stringify(aggregatedPrimitivesAll, null, 2)};
`;
fs.writeFileSync(primitivesAllNamesPath, primitivesAllNamesContent);

const semanticAllNamesContent = `// Auto-generated aggregated names for all semantic tokens
module.exports = ${JSON.stringify(aggregatedSemanticAll, null, 2)};
`;
fs.writeFileSync(semanticAllNamesPath, semanticAllNamesContent);

const utilsAllNamesContent = `// Auto-generated aggregated names for all utility classes
module.exports = ${JSON.stringify(aggregatedUtilsAll, null, 2)};
`;
fs.writeFileSync(utilsAllNamesPath, utilsAllNamesContent);

console.log("Generated overall aggregated names files for primitives, semantic tokens, and utility classes.");

// ---------- Generate Per-Semantic Category Aggregated Files ----------
for (const categoryKey in aggregatedSemanticByCategory) {
  const perCategoryTsPath = path.join(distDir, 'types', categoryFolderMap.semanticTokens, `all-${categoryKey}-types.d.ts`);
  const perCategoryTsContent = `// Auto-generated aggregated types for all semantic tokens in category "${categoryKey}"
export const all${toPascalCase(categoryKey)}SemanticTokens = ${JSON.stringify(aggregatedSemanticByCategory[categoryKey], null, 2)} as const;
export type All${toPascalCase(categoryKey)}SemanticToken = typeof all${toPascalCase(categoryKey)}SemanticTokens[number];
`;
  fs.writeFileSync(perCategoryTsPath, perCategoryTsContent);

  const perCategoryNamesPath = path.join(distDir, 'names', categoryFolderMap.semanticTokens, `all-${categoryKey}-names.js`);
  const perCategoryNamesContent = `// Auto-generated aggregated names for all semantic tokens in category "${categoryKey}"
module.exports = ${JSON.stringify(aggregatedSemanticByCategory[categoryKey], null, 2)};
`;
  fs.writeFileSync(perCategoryNamesPath, perCategoryNamesContent);

  console.log(`Generated aggregated TS types and names for semantic tokens category: ${categoryKey}`);
}

// ---------- Generate Per-Utility Category Aggregated Files ----------
for (const utilKey in aggregatedUtilsByCategory) {
  const perUtilTsPath = path.join(distDir, 'types', categoryFolderMap.utilityClasses, `all-${utilKey}-types.d.ts`);
  const perUtilTsContent = `// Auto-generated aggregated types for all utility classes in category "${utilKey}"
export const all${toPascalCase(utilKey)}UtilityClasses = ${JSON.stringify(aggregatedUtilsByCategory[utilKey], null, 2)} as const;
export type All${toPascalCase(utilKey)}UtilityClass = typeof all${toPascalCase(utilKey)}UtilityClasses[number];
`;
  fs.writeFileSync(perUtilTsPath, perUtilTsContent);

  const perUtilNamesPath = path.join(distDir, 'names', categoryFolderMap.utilityClasses, `all-${utilKey}-names.js`);
  const perUtilNamesContent = `// Auto-generated aggregated names for all utility classes in category "${utilKey}"
module.exports = ${JSON.stringify(aggregatedUtilsByCategory[utilKey], null, 2)};
`;
  fs.writeFileSync(perUtilNamesPath, perUtilNamesContent);

  console.log(`Generated aggregated TS types and names for utility classes category: ${utilKey}`);
}

// ---------- Generate Index CSS ----------
function generateIndexCss(rootDir, relativeDir = '') {
  let imports = '';
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  entries.forEach(entry => {
    const entryPath = path.join(rootDir, entry.name);
    const entryRelativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      imports += generateIndexCss(entryPath, entryRelativePath);
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      const importPath = './' + path.join('css', entryRelativePath).replace(/\\/g, '/');
      imports += `@import '${importPath}';\n`;
    }
  });
  return imports;
}

const cssRootDir = path.join(distDir, 'css');
const indexCssContent = generateIndexCss(cssRootDir);
const indexCssPath = path.join(distDir, 'index.css');
fs.writeFileSync(indexCssPath, indexCssContent);
console.log(`Generated index.css at ${indexCssPath}`);

console.log("Design system package generated successfully in the 'theme' folder.");
