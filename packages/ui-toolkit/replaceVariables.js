const fs = require('fs');
const path = require('path');

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const source = fileInfo.source;

  // Full map of primitive variables to semantic variables
  const variableMap = {
    '--white': '--background-primary',
    '--black': '--background-primary-dark',
    '--gray50': '--background-secondary',
    '--gray100': '--background-tertiary',
    '--overlay00': ' --background-transparent',
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

  // Replace each occurrence of primitive variables with the semantic variable
  let updatedSource = source;

  for (const [ primitive, semantic ] of Object.entries(variableMap)) {
    const regex = new RegExp(primitive, 'g');

    updatedSource = updatedSource.replace(regex, semantic);
  }

  return updatedSource;
};
