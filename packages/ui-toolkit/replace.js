const fs = require('fs');
const path = require('path');

console.log('Replace variables in CSS files');
// Variable map for replacements
const variableMap = {
  '--white': '--background-primary',
  '--black': '--background-primary-dark',
  '--gray50': '--background-secondary',
  '--gray100': '--background-tertiary',
  '--overlay00': '--background-transparent',
  '--overlay70': '--background-overlay-primary',
  '--overlay30': '--background-overlay-secondary',
  '--green100': '--background-accent-subtle',
  '--red100': '--background-negative-subtle',
  '--yellow100': '--background-warning-subtle',
  '--purple100': '--background-accent-secondary-subtle',
  '--gray150': '--border-primary',
  '--gray100': '--border-disabled',
  '--gray900': '--content-primary',
  '--gray700': '--content-secondary',
  '--gray500': '--content-tertiary',
  '--gray300': '--content-inverse-secondary',
  '--green500': '--content-accent',
  '--red500': '--content-negative',
  '--yellow500': '--content-warning',
  '--gray400': '--content-disabled',
  '--purple500': '--content-accent-secondary',
  '--purple300': '--content-accent-secondary-subtle',
  '--bg-transparent-hover': '--hover-background-transparent',
  '--bg-accent-hover': '--hover-background-accent',
  '--bg-accent-subtle-hover': '--hover-background-accent-subtle',
  '--bg-transparent-accent-hover': '--hover-background-transparent-accent',
  '--bg-positive-hover': '--hover-background-positive',
  '--bg-positive-subtle-hover': '--hover-background-positive-subtle',
  '--bg-transparent-positive-hover': '--hover-background-transparent-positive',
  '--bg-negative-hover': '--hover-background-negative',
  '--bg-negative-subtle-hover': '--hover-background-negative-subtle',
  '--bg-transparent-negative-hover': '--hover-background-transparent-negative',
  '--bg-transparent-selected': '--selected-background-transparent',
  '--bg-accent-selected': '--selected-background-accent',
  '--bg-accent-subtle-selected': '--selected-background-accent-subtle',
  '--bg-transparent-accent-selected': '--selected-background-transparent-accent',
  '--bg-positive-selected': '--selected-background-positive',
  '--bg-positive-subtle-selected': '--selected-background-positive-subtle',
  '--bg-transparent-positive-selected': '--selected-background-transparent-positive',
  '--bg-negative-selected': '--selected-background-negative',
  '--bg-negative-subtle-selected': '--selected-background-negative-subtle',
  '--bg-transparent-negative-selected': '--selected-background-transparent-negative'
};

// Function to process a single CSS file
async function processCSSFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    let updatedContent = data;
    let replacements = 0;

    // Log original content for debugging
    console.log(`\nProcessing file: ${filePath}`);
    console.log('Original content sample:', data.slice(0, 200) + '...');

    for (const [ oldVar, newVar ] of Object.entries(variableMap)) {
      // Create a regex that matches the CSS variable in different contexts
      // This will match the variable when it's used in var(), as a custom property definition, or in calc()
      const regex = new RegExp(`${oldVar}(?=[\\s,;)}])`, 'g');

      const matches = updatedContent.match(regex);

      if (matches) {
        const count = matches.length;

        replacements += count;
        console.log(`Found ${count} occurrences of ${oldVar}`);
      }

      updatedContent = updatedContent.replace(regex, newVar);
    }

    if (replacements > 0) {
      console.log(`Made ${replacements} replacements in ${filePath}`);
      console.log('Updated content sample:', updatedContent.slice(0, 200) + '...');

      // Only write the file if changes were made
      await fs.promises.writeFile(filePath, updatedContent, 'utf8');
      console.log(`Successfully updated ${filePath}`);

    } else {
      console.log(`No replacements needed in ${filePath}`);
    }

  } catch (err) {
    console.error('Error processing file:', filePath, err);
    throw err;
  }
}

// Function to recursively process directories
async function processDirectory(directory) {
  try {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);

      } else if (entry.isFile() && path.extname(entry.name) === '.css') {
        // Process CSS files
        await processCSSFile(fullPath);
      }
    }

  } catch (err) {
    console.error('Error processing directory:', directory, err);
    throw err;
  }
}

// Main function to start the process
async function replaceVariablesInCSSFiles(startDirectory) {
  console.log(`Starting to replace variables in CSS files in directory: ${startDirectory}`);

  try {
    // Check if directory exists
    const stats = await fs.promises.stat(startDirectory);

    if (!stats.isDirectory()) {
      throw new Error(`${startDirectory} is not a directory`);
    }

    await processDirectory(startDirectory);
    console.log('Finished processing all CSS files');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Function to validate the variable map
function validateVariableMap() {
  const duplicateKeys = Object.keys(variableMap).filter((key, index, array) =>
    array.indexOf(key) !== index
  );

  if (duplicateKeys.length > 0) {
    console.warn('Warning: Duplicate keys found in variableMap:', duplicateKeys);
  }
}

// Validate variable map before starting
validateVariableMap();

// Replace './src' with the path to your CSS files
replaceVariablesInCSSFiles('./src');
