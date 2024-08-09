## IconStore

 [![npm version](https://img.shields.io/npm/v/@groww-tech/icon-store?color=51C838)](https://www.npmjs.com/package/@groww-tech/icon-store) 
 ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Groww/webster/icon-store.yml?color=51C838)

<br/>

### Publish

For publishing a new version, merge new svgs to main branch and increase the version.<br>
We already have prepublishOnly command setup to pack the package for you. <br>

### MI Icons

Filter and copy material icons from Google's official npm package.
(Only if you need to update the material icons)

```bash
node scripts/generateMaterialIcons.js
```

---


### Folder Structure

<br>

```
.
├── mi                       // minified material svg's react components
├── custom                   // minified custom svg's react components
├── mint-icons               // minified mint-icons svg's react components
└── types.d.ts               // exports react component type  
│ 
├── svgs
│   ├── mi
│   ├── custom
│   └── mint-icons
│ 
├── scripts
│   ├── generateMaterialIcons.js  // Script to copy and filter material icons from google's github repo
│   ├── generateTypes.js          // Script to generate type for babel transformed svg component's js file
│   ├── compileComponent.js       // Script to transform and minify JS modules code for shipping
│   └── helpers
│       ├── template.js           // Custom template for our generated React components
│       └── utils.js              // General utility function
│ 
├── material-design-icons         // cloned material design repo
├── .svgrc.js                     // svgrc config file
├── package.json
├── README.md
└── .gitignore

```

### License

MIT

<br/>

*This package is customized for use in Groww projects. Use at your own risk.*

<br/>

---

