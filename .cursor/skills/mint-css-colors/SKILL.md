---
name: mint-css-colors
description: Design system color tokens and semantic color variables. Use for consistent color usage across applications with automatic dark mode support.
---

# Mint CSS Color System

## Import

```css
/* Full import includes all colors */
import '@groww-tech/mint-css/dist/index.css';

/* All variables */
@import '@groww-tech/mint-css/dist/fragments/allVariables.css';
```

## Color Categories

### Primitive Colors

The design system defines primitives that can be combined:

| Category | Colors |
|----------|--------|
| Yellow | Various yellow shades |
| Red | Various red shades |
| Green | Various green shades |
| Blue | Various blue shades |
| Lilac | Various lilac shades |
| Neutrals | Gray/neutral shades |

### State Colors

| Category | Purpose |
|----------|---------|
| Hover States | Interaction feedback |
| Selected States | Current selection indication |

## Semantic Tokens

### Background Tokens

```css
/* Light theme */
--background-primary: ...;
--background-secondary: ...;
--background-tertiary: ...;

/* Dark theme */
html[data-theme="dark"] {
  --background-primary: ...;
  --background-secondary: ...;
  --background-tertiary: ...;
}
```

### Content/Text Tokens

```css
/* Light theme */
--content-primary: ...;      /* Main text */
--content-secondary: ...;    /* Secondary text */
--content-tertiary: ...;    /* Hints, placeholders */
--contentInverse: ...;      /* Text on dark backgrounds */

/* Dark theme */
html[data-theme="dark"] {
  --content-primary: ...;
  --content-secondary: ...;
  --content-tertiary: ...;
  --contentInverse: ...;
}
```

### Border Tokens

```css
/* Light theme */
--border-primary: ...;      /* Main borders */
--border-secondary: ...;    /* Subtle borders */

/* Dark theme */
html[data-theme="dark"] {
  --border-primary: ...;
  --border-secondary: ...;
}
```

## Usage

### CSS Usage

```css
.my-component {
  background-color: var(--background-primary);
  color: var(--content-primary);
  border-color: var(--border-primary);
}

.my-text {
  color: var(--content-primary);
}

.my-secondary-text {
  color: var(--content-secondary);
}
```

### CSS Modules

```css
/* Component.module.css */
.container {
  background-color: var(--background-secondary);
  color: var(--content-primary);
}
```

### Inline Styles

```jsx
<div style={{
  backgroundColor: 'var(--background-primary)',
  color: 'var(--content-primary)'
}}>
  Content
</div>
```

### CSS-in-JS

```jsx
const styles = {
  container: {
    backgroundColor: 'var(--background-primary)',
    color: 'var(--content-primary)',
  }
};
```

## Common Color Combinations

### Primary Button

```css
.button-primary {
  background-color: var(--primary);
  color: var(--contentInverse);
}

.button-primary:hover {
  background-color: var(--primary-hover);
}
```

### Error State

```css
.error-text {
  color: var(--error);
}

.error-background {
  background-color: var(--error-background);
}
```

### Success State

```css
.success-text {
  color: var(--success);
}
```

### Card Component

```css
.card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border-primary);
}
```

## Token Naming Convention

The token system uses this naming pattern:

```
[category]-[semantic-role]
```

Examples:
- `background-primary` - Main background
- `content-secondary` - Secondary/secondary text
- `border-primary` - Default border color

## Best Practices

1. **Use semantic tokens**: Prefer tokens over hardcoded colors
2. **Test both themes**: Ensure colors work in light and dark
3. **Check contrast**: Ensure accessibility compliance
4. **Use CSS variables**: Never hardcode colors
5. **Document custom colors**: Add tokens for custom brand colors

## Anti-Patterns

1. **Don't hardcode colors**: Always use CSS variables
2. **Don't assume light theme**: Design for both themes
3. **Don't ignore contrast**: Check WCAG compliance
4. **Don't create ad-hoc colors**: Add to design system
5. **Don't forget inverse colors**: For text on colored backgrounds
