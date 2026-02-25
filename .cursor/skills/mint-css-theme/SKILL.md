---
name: mint-css-theme
description: Light and dark theme system with CSS variables. Use for theming support in applications with automatic theme switching.
---

# Mint CSS Theme System

## Import

```css
/* Full import includes theme */
import '@groww-tech/mint-css/dist/index.css';

/* Theme utilities */
@import '@groww-tech/mint-css/dist/fragments/themeUtilities.css';

/* All variables */
@import '@groww-tech/mint-css/dist/fragments/allVariables.css';
```

## Theme Structure

### Light Theme (Default)

```css
html {
  /* Light theme variables */
  --color-background-primary: ...;
  --color-background-secondary: ...;
  --color-content-primary: ...;
  --color-content-secondary: ...;
  /* etc. */
}
```

### Dark Theme

```css
html[data-theme="dark"] {
  /* Dark theme variables */
  --color-background-primary: ...;
  --color-background-secondary: ...;
  --color-content-primary: ...;
  --color-content-secondary: ...;
  /* etc. */
}
```

## Theme Switching

### CSS-Only Approach

```css
/* Automatically uses dark theme when data-theme="dark" */
html[data-theme="dark"] {
  background-color: var(--background-primary);
  color: var(--content-primary);
}
```

### JavaScript Approach

```javascript
// Set dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Set light theme
document.documentElement.setAttribute('data-theme', 'light');

// Toggle theme
const toggle = () => {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
};
```

### React Approach

```jsx
// Using useEffect
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
};
```

### System Preference Detection

```javascript
// Detect system preference
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
});
```

## Theme Transition

### Smooth Transitions

The theme system supports smooth transitions:

```css
html.color-theme-in-transition * {
  transition: background-color 0.3s, color 0.3s !important;
}
```

### Applying Transition

```javascript
// Enable transition before theme change
document.documentElement.classList.add('color-theme-in-transition');
document.documentElement.setAttribute('data-theme', 'dark');

// Remove after transition
setTimeout(() => {
  document.documentElement.classList.remove('color-theme-in-transition');
}, 300);
```

## Semantic Tokens

The theme system provides semantic tokens:

### Background Tokens

```css
background-primary      /* Main background */
background-secondary    /* Secondary background */
background-tertiary     /* Tertiary/cards */
```

### Content Tokens

```css
content-primary         /* Primary text */
content-secondary      /* Secondary text */
content-tertiary       /* Disabled/hint text */
```

### Border Tokens

```css
border-primary         /* Primary borders */
border-secondary       /* Subtle borders */
```

## Usage with Components

### Button

```css
.my-button {
  background-color: var(--background-primary);
  color: var(--content-primary);
  border: 1px solid var(--border-primary);
}

.my-button:hover {
  background-color: var(--background-secondary);
}
```

### Card

```css
.my-card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border-primary);
}
```

## Best Practices

1. **Use semantic tokens**: Prefer `var(--content-primary)` over hex colors
2. **Support both themes**: Test all components in both themes
3. **Provide sufficient contrast**: Ensure accessibility in both themes
4. **Use transition for theme switch**: Better user experience
5. **Respect system preference**: Detect and honor OS settings

## Anti-Patterns

1. **Don't hardcode colors**: Always use CSS variables
2. **Don't forget dark theme**: Design for both from the start
3. **Don't use !important**: Let cascade work
4. **Don't forget images**: Provide dark mode versions where needed
5. **Don't ignore transition state**: Handle smooth theme switching
