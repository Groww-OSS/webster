---
name: mint-css-grid
description: Responsive grid system with 12-column layout for desktop, tablet, and mobile. Use when building page layouts, responsive designs, or any column-based structure.
---

# Mint CSS Grid System

## Installation

```bash
npm install @groww-tech/mint-css
```

## Import

```css
import '@groww-tech/mint-css/dist/index.css';
/* or import just grid */
@import '@groww-tech/mint-css/dist/base/grid.css';
```

## Grid Structure

The grid uses a **12-column system** with three breakpoints:

| Breakpoint | Prefix | Screen Size |
|------------|--------|-------------|
| Small | `s` | Mobile |
| Medium | `m` | Tablet |
| Large | `l` | Desktop |

## Basic Usage

### Row Container

```html
<div class="row">
  <!-- Columns go here -->
</div>
```

### Columns

```html
<div class="row">
  <div class="col s12 m6 l4">
    <!-- Content -->
  </div>
</div>
```

## Column Classes

### Large (Desktop) - Prefix `l`

```css
.col.l1   { width: 8.33%; }
.col.l2   { width: 16.66%; }
.col.l3   { width: 25%; }
.col.l4   { width: 33.33%; }
.col.l5   { width: 41.66%; }
.col.l6   { width: 50%; }
.col.l7   { width: 58.33%; }
.col.l8   { width: 66.66%; }
.col.l9   { width: 75%; }
.col.l10  { width: 83.33%; }
.col.l11  { width: 91.66%; }
.col.l12  { width: 100%; }

/* 5-column layout */
.col.l5ths { width: 20%; }
```

### Medium (Tablet) - Prefix `m`

```css
.col.m1  { width: 8.33%; }
.col.m2  { width: 16.66%; }
.col.m3  { width: 25%; }
.col.m4  { width: 33.33%; }
.col.m5  { width: 41.66%; }
.col.m6  { width: 50%; }
.col.m7  { width: 58.33%; }
.col.m8  { width: 66.66%; }
.col.m9  { width: 75%; }
.col.m10 { width: 83.33%; }
.col.m11 { width: 91.66%; }
.col.m12 { width: 100%; }
```

### Small (Mobile) - Prefix `s`

```css
.col.s1  { width: 8.33%; }
.col.s2  { width: 16.66%; }
.col.s3  { width: 25%; }
.col.s4  { width: 33.33%; }
.col.s5  { width: 41.66%; }
.col.s6  { width: 50%; }
.col.s7  { width: 58.33%; }
.col.s8  { width: 66.66%; }
.col.s9  { width: 75%; }
.col.s10 { width: 83.33%; }
.col.s11 { width: 91.66%; }
.col.s12 { width: 100%; }
```

## Offset Classes

Move columns to the right using offset classes:

### Large (Desktop)

```css
.col.offset-l1  { margin-left: 8.33%; }
.col.offset-l2  { margin-left: 16.66%; }
.col.offset-l3  { margin-left: 25%; }
.col.offset-l4  { margin-left: 33.33%; }
.col.offset-l5  { margin-left: 41.66%; }
.col.offset-l6  { margin-left: 50%; }
.col.offset-l7  { margin-left: 58.33%; }
.col.offset-l8  { margin-left: 66.66%; }
.col.offset-l9  { margin-left: 75%; }
.col.offset-l10 { margin-left: 83.33%; }
.col.offset-l11 { margin-left: 91.66%; }
.col.offset-l12 { margin-left: 100%; }
```

### Medium (Tablet)

```css
.col.offset-m1 through .col.offset-m12
```

### Small (Mobile)

```css
.col.offset-s1 through .col.offset-s12
```

## Usage Examples

### Full Width on Mobile, Half on Tablet, Third on Desktop

```html
<div class="row">
  <div class="col s12 m6 l4">
    Column 1
  </div>
  <div class="col s12 m6 l4">
    Column 2
  </div>
  <div class="col s12 m12 l4">
    Column 3
  </div>
</div>
```

### Centered Column

```html
<div class="row">
  <div class="col s8 offset-s2">
    Centered content
  </div>
</div>
```

### 5-Column Layout

```html
<div class="row">
  <div class="col l5ths">
    Item 1
  </div>
  <div class="col l5ths">
    Item 2
  </div>
  <div class="col l5ths">
    Item 3
  </div>
  <div class="col l5ths">
    Item 4
  </div>
  <div class="col l5ths">
    Item 5
  </div>
</div>
```

### Sidebar Layout

```html
<div class="row">
  <div class="col l3">
    <aside>Sidebar</aside>
  </div>
  <div class="col l9">
    <main>Main Content</main>
  </div>
</div>
```

## Anti-Patterns

1. **Don't forget the `.row` wrapper**: Always wrap columns in a row
2. **Don't exceed 12 columns**: Total should not exceed 12 per row
3. **Don't use columns without breakpoints**: Use all three (s, m, l) for responsive design
4. **Don't mix offset prefixes incorrectly**: Use `offset-s*` with `s*` columns
5. **Don't forget to clear floats**: Row clears floats automatically

## Responsive Behavior

- **Mobile-first approach**: Start with small (s) classes
- **Progressive enhancement**: Add medium (m) and large (l) for larger screens
- **Example**: `col s12 m6 l4` means:
  - Full width on mobile
  - Half width on tablet
  - One-third width on desktop
