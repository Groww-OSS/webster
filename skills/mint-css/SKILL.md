---
name: mint-css
description: Complete Mint CSS design system with grid, typography, colors, utilities, and theming. Use for building consistent, responsive, and accessible web applications with a complete CSS framework.
---

# Mint CSS - Complete Design System

A comprehensive CSS design system by Groww for building modern web applications.

## Installation

```bash
npm install @groww-tech/mint-css
```

## Import Options

### Full Import

```css
import '@groww-tech/mint-css/dist/index.css';
```

### Selective Imports

```css
/* Grid system */
@import '@groww-tech/mint-css/dist/base/grid.css';

/* Typography */
@import '@groww-tech/mint-css/dist/typography/index.css';

/* Utility classes */
@import '@groww-tech/mint-css/dist/base/utility.css';

/* Theme/Colors */
@import '@groww-tech/mint-css/dist/fragments/allVariables.css';

/* Fonts */
@import '@groww-tech/mint-css/dist/fragments/fonts.css';

/* Preloader/Shimmer */
@import '@groww-tech/mint-css/dist/base/preloader.css';
```

## Package Structure

```
@groww-tech/mint-css/
├── base/                    # Core utilities
│   ├── app.css             # Base styles, z-index
│   ├── grid.css            # 12-column responsive grid
│   ├── utility.css         # Utility classes
│   ├── preloader.css       # Shimmer/skeleton loaders
│   ├── temp-utils.css      # Temporary utilities
│   └── temp-vars.css       # Theme variables
├── fragments/              # Aggregated outputs
│   ├── allVariables.css    # All design tokens
│   ├── fonts.css           # Font declarations
│   ├── themeUtilities.css  # Theme utilities
│   └── typographyUtilities.css
├── typography/
│   ├── fonts/              # Font files
│   ├── tokens/             # Typography tokens
│   │   ├── body-tokens.css
│   │   ├── button-tokens.css
│   │   ├── display-tokens.css
│   │   └── heading-tokens.css
│   └── variables/          # Typography variables
├── designSystemConfig.js   # Design token config
└── generateDesignSystem.js # CSS generation
```

## Skills by Category

### Layout
| Skill | Description |
|-------|-------------|
| [mint-css-grid](mint-css-grid/) | 12-column responsive grid system |
| [mint-css-utilities](mint-css-utilities/) | Utility CSS classes |

### Typography
| Skill | Description |
|-------|-------------|
| [mint-css-typography](mint-css-typography/) | Font families, sizes, token classes |

### Theming
| Skill | Description |
|-------|-------------|
| [mint-css-theme](mint-css-theme/) | Light/dark theme switching |
| [mint-css-colors](mint-css-colors/) | Design token colors |

### Components
| Skill | Description |
|-------|-------------|
| [mint-css-preloader](mint-css-preloader/) | Skeleton/shimmer loading |

### Foundation
| Skill | Description |
|-------|-------------|
| [mint-css-zindex](mint-css-zindex/) | Z-index layering scale |

## Quick Reference

### Grid Classes

```html
<div class="row">
  <div class="col s12 m6 l4">Column</div>
</div>
```

### Typography

```html
<p class="bodyBase">Body text</p>
<h1 class="headingLarge">Heading</h1>
```

### Utilities

```html
<div class="flex vspace-between">...</div>
<div class="absolute-center">...</div>
```

### Theme

```css
/* Use semantic tokens */
color: var(--content-primary);
background: var(--background-primary);
```

### Preloader

```html
<div class="ph-item">
  <div class="ph-row">
    <div class="ph-col-6"></div>
  </div>
</div>
```

## Key Features

1. **Responsive Grid**: 12-column grid with mobile/tablet/desktop breakpoints
2. **Typography System**: Token-based text sizing and weights
3. **Theme Support**: Automatic light/dark theme switching
4. **Utility Classes**: Common layout and positioning helpers
5. **Preloader**: Skeleton loading animations
6. **Z-Index Scale**: Consistent layering system

## Design Tokens

The system generates CSS variables for:

- **Colors**: Primitive colors, semantic tokens
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Borders**: Border widths and radii

## Usage with React

```jsx
// Using CSS Modules
import styles from './Component.module.css';

<div className={`${styles.container} ${styles.card}`}>
  <h2 className="headingLarge">Title</h2>
  <p className="bodyBase">Content</p>
</div>
```

## Usage with Styled Components

```jsx
import styled from 'styled-components';

const Container = styled.div`
  background: var(--background-secondary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
`;

const Title = styled.h2`
  font-family: var(--font-family-primary);
  color: var(--content-primary);
`;
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties support required

## Best Practices

1. **Use semantic tokens**: Prefer `var(--content-primary)` over hex colors
2. **Follow grid conventions**: Use row + column pattern
3. **Leverage typography tokens**: Use token classes for consistency
4. **Support both themes**: Test all components in light and dark
5. **Use utilities appropriately**: For layout, not component styling

## Related

- [groww-ui-toolkit](../groww-ui-toolkit/) - React component library that uses mint-css
