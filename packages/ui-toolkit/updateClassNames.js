/**
 * jscodeshift script to find a particular className and append a new utilClassName
 */

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Define filePath, targetClassName, and utilClassNameToAdd directly in the script
  const filePath = fileInfo.path;  // The file being transformed
  const targetClassName = 'np15Root';  // The class name to find (modify as needed)
  const utilClassNameToAdd = 'contentAccent';  // The utility class name to append (modify as needed)

  // Traverse through JSX elements to find the `className` attributes
  root.find(j.JSXAttribute, {
    name: { name: 'className' }
  })
    .forEach(path => {
      const classNameValue = path.node.value.value; // Get the current className value

    // Check if the target class name exists in the className
      if (classNameValue.includes(targetClassName)) {
      // Append the new utility class name after the target className, ensuring no duplicates
        const updatedClassName = classNameValue
          .split(' ')
          .filter(Boolean) // Remove any empty values
          .includes(utilClassNameToAdd)
          ? classNameValue // Do nothing if the util class is already present
          : classNameValue + ' ' + utilClassNameToAdd;

      // Update the className with the new value
        path.node.value.value = updatedClassName;
      }
    });

  // Output the transformed source with single quotes for consistency
  return root.toSource();
};
