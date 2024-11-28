const fs = require('fs').promises;
const path = require('path');

const jsonFilePath = path.resolve(__dirname, './updatedMappings.json');
const allowedExtensions = [ '.js', '.jsx', '.ts', '.tsx' ];


async function updateClassNames() {
  try {
    const jsonData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));
    const updates = {};

    await Promise.all(
      jsonData.map(async (item) => {
        if (item.classNameOccurrences === 1) {
          const { className, semanticUtilClass, classNameFiles } = item;

          await Promise.all(
            classNameFiles.map(async (file) => {
              if (!allowedExtensions.includes(path.extname(file))) {
                console.log(`Skipping unsupported file: ${file}`);
                return;
              }

              const fileContent = await fs.readFile(file, 'utf-8');
              const classRegex = new RegExp(`\\b${className}\\b\\s*\\b${semanticUtilClass}\\b`);

              if (!classRegex.test(fileContent)) {
                updates[file] = (updates[file] || fileContent).replace(
                  new RegExp(`\\b${className}\\b`, 'g'),
                  `${className} ${semanticUtilClass}`
                );
              }
            })
          );
        }
      })
    );

    await Promise.all(
      Object.entries(updates).map(([ file, content ]) =>
        fs.writeFile(file, content, 'utf-8').then(() => console.log(`Updated file: ${file}`))
      )
    );

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

updateClassNames();
