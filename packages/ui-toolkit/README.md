# Groww UI-Toolkit
React UI library used by Groww.

## Storybook of components (Demo):
https://groww-ui.netlify.app/

## Installation
Install the dependencies and devDependencies and start the server.

```sh
npm i @groww-tech/ui-toolkit
```

## Development

To start the storybook server
```sh
yarn storybook
```

To build the library
```sh
yarn build
```

To check linting
```sh
yarn lint
```

## Folder Structure
```
.
├── README.md
├── package.json
├── rollup.config.js
├── src
│   ├── components    //code for components
│   │   ├── atoms
│   │   ├── index.ts
│   │   └── molecules
│   ├── index.ts
│   └── utils
├── stories   //stories for each components
│   ├── Button.stories.tsx
│   ├── CheckBox.stories.tsx
│   ├── IconStore.stories.tsx
│   └── Image.stories.tsx
└── tsconfig.json
```
## License

MIT
