---
name: mint-css-utilities
description: Utility CSS classes for common styling needs like positioning, layout, spacing, and display. Use for rapid prototyping and consistent utility styling.
---

# Mint CSS Utility Classes

## Import

```css
import '@groww-tech/mint-css/dist/index.css';
/* or specific */
@import '@groww-tech/mint-css/dist/base/utility.css';
```

## Display & Visibility

| Class | CSS | Description |
|-------|-----|-------------|
| `.hide` | `display: none !important` | Hide element |
| `.responsive-img` | `max-width: 100%; height: auto` | Responsive image |

## Flexbox Layout

| Class | CSS | Description |
|-------|-----|-------------|
| `.flex` | `display: flex` | Flex container |
| `.flex-column` | `flex-direction: column` | Column direction |
| `.valign-wrapper` | `display: flex; align-items: center` | Vertical center |
| `.halign-wrapper` | `display: flex; justify-content: center` | Horizontal center |
| `.vspace-between` | `justify-content: space-between` | Space between |

## Alignment

| Class | CSS | Description |
|-------|-----|-------------|
| `.left-align` | `text-align: left` | Left align text |
| `.right-align` | `text-align: right` | Right align text |
| `.center-align` | `text-align: center` | Center align text |

## Positioning

| Class | CSS | Description |
|-------|-----|-------------|
| `.pos-rel` | `position: relative` | Relative position |
| `.pos-abs` | `position: absolute` | Absolute position |
| `.absolute-center` | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` | Center absolutely |

## Sizing

| Class | CSS | Description |
|-------|-----|-------------|
| `.fullWidth` | `width: 100%` | Full width |
| `.width100` | `width: 100%` | Width 100% |
| `.height100` | `height: 100%` | Height 100% |
| `.circle` | `border-radius: 50%` | Circular shape |

## Cursor

| Class | CSS | Description |
|-------|-----|-------------|
| `.cur-po` | `cursor: pointer` | Pointer cursor |
| `.cur-no` | `cursor: not-allowed` | Not-allowed cursor |

## Floating

| Class | CSS | Description |
|-------|-----|-------------|
| `.flo-r` | `float: right` | Float right |
| `.flo-l` | `float: left` | Float left |

## Text

| Class | CSS | Description |
|-------|-----|-------------|
| `.truncate` | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` | Truncate with ellipsis |

## Components

| Class | Description |
|-------|-------------|
| `.card` | Card container styling |
| `.clickable-text` | Clickable text styling |
| `.dashed-hr-border` | Dashed horizontal border |
| `.blurEffect1` | Blur effect (backdrop-filter) |

## Layout

| Class | CSS | Description |
|-------|-----|-------------|
| `.page-padding` | Page padding |
| `.web-align` | `max-width: 1110px; margin: 0 auto` | Web alignment |
| `.web-align-w-1110` | `max-width: 1110px` | Explicit 1110px width |

## Dropdown

| Class | Description |
|-------|-------------|
| `.dropdown` | Dropdown container |
| `.dropdown__content` | Dropdown content panel |
| `.dropdown--active` | Active dropdown state |

## Clearfix

```html
<div class="clearfix">
  <div class="flo-l">Left</div>
  <div class="flo-r">Right</div>
</div>
```

## Animation

| Class | Description |
|-------|-------------|
| `.onMount-appear` | Initial appear state |
| `.onMount-appear.onMount-appear-active` | Active animation state |

## Usage Examples

### Center Content

```html
<div class="flex halign-wrapper valign-wrapper" style="height: 200px;">
  <div>Centered Content</div>
</div>
```

### Responsive Image

```html
<img src="image.jpg" class="responsive-img" />
```

### Truncate Text

```html
<p class="truncate">Long text that will be truncated...</p>
```

### Card

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Absolute Center

```html
<div class="pos-rel" style="height: 200px;">
  <div class="absolute-center">Centered</div>
</div>
```

### Space Between

```html
<div class="flex vspace-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Dropdown

```html
<div class="dropdown dropdown--active">
  <button>Toggle</button>
  <div class="dropdown__content">
    Dropdown content
  </div>
</div>
```

## Anti-Patterns

1. **Don't overuse utilities for complex layouts**: Use custom CSS when needed
2. **Don't forget responsive implications**: Utilities don't always handle breakpoints
3. **Don't use for component styling**: Utilities are for layout/primitive styling
4. **Don't mix with component libraries**: May conflict
5. **Don't use float for major layouts**: Use flexbox or grid instead
