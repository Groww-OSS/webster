<p align="center">
  <a href="https://groww.in/" rel="noopener" target="_blank"><img width="250" src="https://resources.groww.in/web-assets/img/website-logo/groww-logo-light.svg" alt="Groww"></a>
</p>

<h1 align="center">Mint CSS</h1>

<p align="center">A CSS library that provides classes, tokens, variables, fonts and other essential stylings governed under MINT design system, used by Groww</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder structure](#folder-structure)
- [License](#license)

## Installation

```bash
npm install @groww-tech/mint-css
```

## Usage

First, import the package in the root document of your project.

```
import '@groww-tech/mint-css/dist/index.css';
```

The `dist/index.css` is complied and minfied version of the CSS library which will serve all the tokens/classes which can be used in your project.

## Fragments

If you prefer not to import all classes at once by using `'dist/index.css'` or want to use specific parts of **mint-css**, you can leverage **fragments**. Fragments allow you to import only the styles you need, keeping your bundle size smaller and more focused.

- **Optimized Imports:** Only include the CSS you need, reducing unused styles.
- **Flexibility:** Customize your usage by combining specific fragments as required.
- **Scalability:** Easily add or remove fragments as your project evolves.

#### Variables

Includes all design tokens, such as colors, spacing, and typography variables.

```
import '@groww-tech/mint-css/dist/fragments/allVariables.css';
```

#### Font Faces

Contains font-face declarations for the typography used in the design system. ex: GrowwSans

```
import '@groww-tech/mint-css/dist/fragments/fonts.css';
```

#### Theme Utilities

Provides utility classes for themes and other theming-related styles.

```
import '@groww-tech/mint-css/dist/fragments/themeUtilities.css';
```

#### Typography Utilities

Includes utility classes for typography, such as body, display, button typography.

```
import '@groww-tech/mint-css/dist/fragments/typographyUtilities.css';
```

## Features

### What are Tokens?

Tokens are abstract entity which denotes **symantic meaning** and store values. When you use `contentAccent`, you’re using a colour token which contains `#00B386` as its value, same is applicable to typography.

There are two categories through which we will be exposing various semantic tokens. The tokens are further categorized based on visual emphasis and hierarchy of the UI elements.

1. Typography tokens

   `GrowwSans` and `NotoSans` font families will get downloaded once you install and import the library into your project. These are the tokens can be used -

   - Body
   - Display
   - Heading
   - Button

   e.g. The token `bodySmall` says that, it can be used in body with regular font weight which have font size of 12pts.

   ```
   .bodySmall {
       font-size: var(--font-size-12);
       font-weight: var(--font-weight-regular);
       line-height: 1.5;
   }
   ```

   `<div className="bodySmall">Some content</div>`

   ***

2. Color tokens

   Again, the color tokens are further classified into different categories and can be used in different styles depending on the UI elements

   - Background
   - Content
   - Border

   e.g. We have a token called contentPrimary which refers to the most important and essential information within a piece of content.

   ```
   .contentPrimary {
     color: var(--content-primary);
   }
   ```

   `<div className="contentPrimary">Some content</div>`

## Folder structure

```
└── mint-css/
    ├── dist/
    │   ├── fragments/
    │   │   ├── allVariables.css
    │   │   ├── fonts.css
    │   │   ├── themeUtilities.css
    │   │   └──typographyUtilities.css
    │   ├── font1.woff2
    │   ├── font2.woff2
    │   ├── index.css
    ├── base/
    │   ├── app.css
    │   ├── grid.css
    │   ├── preloader.css
    │   ├── utility.css
    │   └── index.css
    ├── theme/
    │   ├── tokens/
    │   │   ├── background-tokens.css
    │   │   ├── content-tokens.css
    │   │   ├── border-tokens.css
    │   ├── variables/
    │   │   └── index.css
    │   └── index.css
    ├── typography/
    │   ├── fonts/
    │   │   ├── font1.woff2
    │   │   ├── font2.woff2
    │   │   ├── .
    │   │   └── .
    │   ├── tokens/
    │   │   ├── body-tokens.css
    │   │   ├── display-tokens.css
    │   │   ├── heading-tokens.css
    │   │   └── button-tokens.css
    │   ├── variables/
    │   │   └── index.css
    |   ├── font-face.css
    │   └── index.css
    ├── README.md
    ├── index.css
    └── package.json

```

## License

MIT

---

> _This CSS library is customized for use in Groww projects. Use at your own risk._
