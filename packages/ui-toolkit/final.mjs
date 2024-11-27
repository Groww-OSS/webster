import fs from 'fs';
import path from 'path';

export default function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Load and parse the JSON mappings
  const mappingsPath = path.resolve(__dirname, './updatedMappings.json');
  const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf-8'));

  // Filter mappings relevant to the current file based on `classNameFiles`
  const relevantMappings = mappings.filter(mapping =>
    mapping.classNameFiles.includes(fileInfo.path) && mapping.classNameOccurrences === 1
  );

  // If no relevant mappings, return the original source
  if (relevantMappings.length === 0) {
    return fileInfo.source;
  }

  // Traverse through JSX elements to find `className` attributes
  root.find(j.JSXAttribute, {
    name: { name: 'className' },
  }).forEach((path) => {
    const classNameValue = path.node.value.value; // Get the current className value
    if (!classNameValue) return; // Skip if className is not a string literal

    relevantMappings.forEach(({ className, semanticUtilClass }) => {
      // Check if the target class name exists in the className
      if (classNameValue.includes(className)) {
        // Append the new utility class name after the target className, ensuring no duplicates
        const updatedClassName = classNameValue
          .split(' ')
          .filter(Boolean) // Remove any empty values
          .includes(semanticUtilClass)
          ? classNameValue // Do nothing if the util class is already present
          : `${classNameValue} ${semanticUtilClass}`;

        // Update the className with the new value
        path.node.value.value = updatedClassName;
      }
    });
  });

  // Output the transformed source with single quotes for consistency
  return root.toSource();
}
