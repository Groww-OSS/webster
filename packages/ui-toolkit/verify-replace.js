const fs = require('fs').promises;
const path = require('path');

const jsonFilePath = path.resolve(__dirname, './updatedMappings.json');
const allowedExtensions = [ '.js', '.jsx', '.ts', '.tsx' ];


async function updateClassNames() {
  try {
    // Read and parse the JSON file
    const jsonData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));
    const updates = {};

    // Process each item in the JSON data
    await Promise.all(
      jsonData.map(async (item) => {
        if (item.classNameOccurrences === 1) {
          const { className, semanticUtilClass, classNameFiles } = item;

          // Process each file where the className occurs
          await Promise.all(
            classNameFiles.map(async (file) => {
              const fileExtension = path.extname(file);

              // Skip unsupported file extensions
              if (!allowedExtensions.includes(fileExtension)) {
                console.log(`Skipping unsupported file: ${file}`);
                return;
              }

              try {
                const fileContent = await fs.readFile(file, 'utf-8');

                // Refine regex to avoid accidental modifications
                const classRegex = new RegExp(
                  `(\\b${className}\\b)(?!-)`, // Match `className` as a standalone word not followed by `-`
                  'g'
                );

                // Only update if the semanticUtilClass is not already present
                if (!new RegExp(`\\b${className}\\b\\s*\\b${semanticUtilClass}\\b`).test(fileContent)) {
                  updates[file] = (updates[file] || fileContent).replace(
                    classRegex,
                    `$1 ${semanticUtilClass}`
                  );
                }

              } catch (fileError) {
                console.error(`Error reading file ${file}: ${fileError.message}`);
              }
            })
          );
        }
      })
    );

    // Write the updates to the respective files
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
