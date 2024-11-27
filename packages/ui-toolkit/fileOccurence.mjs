import fs from 'fs';
import path from 'path';
import data from './mappings.json' assert { type: 'json' };

const rootDirectory = './src';

// Helper function to get all file paths recursively
const getAllFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);

    } else if (/\.(js|ts|tsx|jsx)$/.test(fullPath)) {
      fileList.push(fullPath);
    }
  });

  return fileList;
};

// Helper function to count occurrences of a className in files
const countClassNameOccurrences = (className, filePaths) => {
  const filesWithClassName = [];

  filePaths.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    if (fileContent.includes(className)) {
      filesWithClassName.push(filePath);
    }
  });

  return filesWithClassName;
};

// Get all files from the root directory
const allFiles = getAllFiles(rootDirectory);

// Process each entry in the JSON data
const updatedData = data.map(entry => {
  const { className } = entry;

  // Find files where the className appears
  const filesWithClassName = countClassNameOccurrences(className, allFiles);

  // Add the new fields to the entry
  return {
    ...entry,
    classNameOccurrences: filesWithClassName.length,
    classNameFiles: filesWithClassName
  };
});

// Write the updated data back to the JSON file
fs.writeFileSync('./updatedMappings.json', JSON.stringify(updatedData, null, 2), 'utf-8');

console.log('Updated data saved to updatedMappings.json');
