import fs from 'fs/promises';
import path from 'path';
import { Worker } from 'worker_threads';
import os from 'os';

// Optimized file scanning with async operations
const getAllFiles = async (dir, fileExtensions = ['.js', '.ts', '.tsx', '.jsx']) => {
  const fileList = [];
  
  const scanDirectory = async (currentDir) => {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    const promises = entries.map(async (entry) => {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (fileExtensions.some(ext => fullPath.endsWith(ext))) {
        fileList.push(fullPath);
      }
    });
    
    await Promise.all(promises);
  };
  
  await scanDirectory(dir);
  return fileList;
};

// Worker thread for processing file contents
const createWorker = (filePaths, className) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      `
      const { parentPort, workerData } = require('worker_threads');
      const fs = require('fs');

      const { filePaths, className } = workerData;
      const filesWithClassName = filePaths.filter(filePath => {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          return fileContent.includes(className);
        } catch (error) {
          console.error(\`Error reading file \${filePath}: \${error}\`);
          return false;
        }
      });

      parentPort.postMessage(filesWithClassName);
    `,
      {
        workerData: { filePaths, className },
        eval: true
      }
    );

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

// Parallel processing of class name occurrences
const processClassNameOccurrences = async (allFiles, data) => {
  const cpuCount = os.cpus().length;
  const batchSize = Math.ceil(data.length / cpuCount);
  
  const processChunk = async (chunk) => {
    const results = await Promise.all(
      chunk.map(async (entry) => {
        const { className } = entry;
        const filesWithClassName = await createWorker(allFiles, className);
        
        return {
          ...entry,
          classNameOccurrences: filesWithClassName.length,
          classNameFiles: filesWithClassName
        };
      })
    );
    
    return results;
  };
  
  const processedData = [];
  for (let i = 0; i < data.length; i += batchSize) {
    const chunk = data.slice(i, i + batchSize);
    const chunkResults = await processChunk(chunk);
    processedData.push(...chunkResults);
  }
  
  return processedData;
};

// Main processing function
const main = async () => {
  try {
    const rootDirectory = './src';
    const { default: data } = await import('./mappings.json', { assert: { type: 'json' } });
    
    console.time('Total Processing Time');
    
    const allFiles = await getAllFiles(rootDirectory);
    const updatedData = await processClassNameOccurrences(allFiles, data);
    
    await fs.writeFile(
      './updatedMappings.json', 
      JSON.stringify(updatedData, null, 2), 
      'utf-8'
    );
    
    console.timeEnd('Total Processing Time');
    console.log('Updated data saved to updatedMappings.json');
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

main();