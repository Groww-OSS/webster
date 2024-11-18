const fs = require('fs');
const path = require('path');

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const source = fileInfo.source;

  // Full map of primitive variables to semantic variables
  const variableMap = {
    '--white': '--background-always-light',
    '--black': '--background-always-dark',
    '--gray50': '--background-secondary',
    '--gray100': '--background-tertiary',
    '--gray900': '--background-inverse-primary',
    '--overlay00': '--background-transparent',
    '--overlay70': '--background-overlay-primary',
    '--overlay30': '--background-overlay-secondary',
    '--green500': '--background-accent',
    '--green100': '--background-accent-subtle',
    '--red500': '--background-negative',
    '--red100': '--background-negative-subtle',
    '--yellow500': '--background-warning',
    '--yellow100': '--background-warning-subtle',
    '--purple500': '--background-accent-secondary',
    '--purple100': '--background-accent-secondary-subtle'
    // Add any additional mappings here as needed
  };

  // Replace each occurrence of primitive variables with the semantic variable
  let updatedSource = source;

  for (const [ primitive, semantic ] of Object.entries(variableMap)) {
    const regex = new RegExp(primitive, 'g');

    updatedSource = updatedSource.replace(regex, semantic);
  }

  return updatedSource;
};
