import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';
import postcssUrl from 'postcss-url';
import path from 'path';
import fs from 'fs';

// getting all CSS files from the fragments folder
const getCSSFiles = (folder) => {
  if (!fs.existsSync(folder)) return [];
  const files = fs.readdirSync(folder);
  return files.filter((file) => file.endsWith('.css'));
};

// I/O for fragments
const fragmentsFolder = './fragments';
const outputFolder = './dist/fragments';

// Generate configuration for each CSS file in fragments folder
const fragmentConfigs = getCSSFiles(fragmentsFolder).map((file) => ({
  input: path.join(fragmentsFolder, file),
  output: {
    file: path.join(outputFolder, file), // Output to corresponding location
  },
  plugins: [
    postcss({
      plugins: [postcssImport(), postcssUrl({
        url: ({ url }) => {
          // Replace "./" with "../" in font URLs
          if (url.includes('woff2') && url.startsWith('./')) {
            return url.replace('./', '../');
          }
          return url;
        },
      })],
      extract: true,
      minimize: true,
      sourceMap: false,
    }),
  ],
}));

// Main configuration array
export default [
  // configuration for index.css ~ this css contains everything of mint-css library (including fragments)
  {
    input: './index.css',
    output: {
      file: './dist/index.css', // Output file
    },
    plugins: [
      postcss({
        plugins: [postcssImport()],
        extract: true,
        minimize: true,
        sourceMap: false,
      }),
      copy({
        targets: [
          { src: './typography/fonts/*.woff2', dest: 'dist' },
          { src: './theme/types', dest: 'dist' }, // Copy theme/types to dist
        ],
        after: [
          {
            src: 'dist/index.css',
            dest: 'dist',
          },
        ],
      }),
    ],
  },
  ...fragmentConfigs,
];
