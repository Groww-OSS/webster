---
name: mint-css-zindex
description: Z-index scale and layering system for proper element stacking. Use for managing modal overlays, dropdowns, popups, and other layered elements.
---

# Mint CSS Z-Index System

## Import

```css
/* Z-index is included in the full import */
import '@groww-tech/mint-css/dist/index.css';
/* or */
@import '@groww-tech/mint-css/dist/base/app.css';
```

## Z-Index Scale

The design system defines a z-index hierarchy:

| Element | Z-Index Value | Usage |
|---------|---------------|-------|
| `maxValue` | 10001 | Maximum value (use sparingly) |
| snackbar | 900 | Toast notifications |
| popup | 800 | Modal dialogs, popups |
| video playback | 700 | Video player controls |
| sidebar | 600 | Side navigation |
| Header | 500 | Sticky headers |
| dropdown | 400 | Dropdown menus |
| fix bottom btn | 300 | Fixed bottom buttons |

## CSS Variables

```css
:root {
  --zindex-snackbar: 900;
  --zindex-popup: 800;
  --zindex-video: 700;
  --zindex-sidebar: 600;
  --zindex-header: 500;
  --zindex-dropdown: 400;
  --zindex-fixed-bottom: 300;
}
```

## Usage Examples

### Modal (popup)

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 800; /* popup */
}

.modal-content {
  position: relative;
  z-index: 801; /* Above overlay */
}
```

### Dropdown

```css
.dropdown-trigger {
  position: relative;
  z-index: 400;
}

.dropdown-menu {
  position: absolute;
  z-index: 401; /* Above trigger */
}
```

### Header + Dropdown

```css
.header {
  position: sticky;
  top: 0;
  z-index: 500;
}

.dropdown-menu {
  z-index: 501; /* Above header when open */
}
```

### Toast Notification

```css
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 900;
}
```

### Sidebar + Modal

```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 600;
}

.modal-overlay {
  z-index: 800;
  /* Sidebar is covered by modal */
}
```

## Proper Layering

### Correct Order

```css
/* Lowest to highest */
body { z-index: 1; }
.fixed-bottom { z-index: 300; }
.dropdown { z-index: 400; }
.header { z-index: 500; }
.sidebar { z-index: 600; }
.video-player { z-index: 700; }
.modal-overlay { z-index: 800; }
.toast { z-index: 900; }
.max-element { z-index: 10001; }
```

### Component Stacking

```css
/* A dropdown inside a modal should appear above the modal content */
.modal {
  z-index: 800;
}

.modal .dropdown {
  z-index: 801; /* Above modal */
}

/* But below the modal's close button if needed */
.modal .dropdown {
  z-index: 800; /* Below close button */
}

.modal .close-button {
  z-index: 802;
}
```

## Common Patterns

### Header with Dropdown

```css
.header {
  z-index: 500;
}

.header .dropdown {
  /* Automatically above header content */
  z-index: 501;
}
```

### Modal with Tooltip

```css
.modal {
  z-index: 800;
}

.modal .tooltip {
  /* Above modal */
  z-index: 801;
}
```

### Sidebar with Popover

```css
.sidebar {
  z-index: 600;
}

.sidebar .popover {
  z-index: 601;
}
```

## Anti-Patterns

1. **Don't use arbitrary z-index**: Use the defined scale
2. **Don't skip values**: Gaps are okay, but don't jump randomly
3. **Don't set z-index without position**: z-index only works with position
4. **Don't overcomplicate**: Keep stacking simple
5. **Don't use maxValue casually**: Reserve for special cases

## Best Practices

1. **Use semantic naming**: Link z-index to component type
2. **Document custom values**: Add new values to scale if needed
3. **Test stacking in all scenarios**: Ensure proper layering
4. **Consider mobile**: Z-index behaves differently on mobile
5. **Use position: relative when needed**: For creating new stacking contexts
