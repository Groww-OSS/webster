---
name: mint-css-preloader
description: Shimmer/placeholder loading animations for skeleton screens. Use for loading states, content placeholders, or skeleton UI during data fetching.
---

# Mint CSS Preloader (Shimmer)

## Import

```css
import '@groww-tech/mint-css/dist/index.css';
/* or specific */
@import '@groww-tech/mint-css/dist/base/preloader.css';
```

## Structure

The shimmer effect creates placeholder animations that indicate loading:

```
ph-item (container)
├── ph-row (row 1)
│   ├── ph-col-2/4/6/8/10/12 (columns)
│   └── ph-avatar (optional)
├── ph-row (row 2)
└── ph-picture (optional)
```

## Preloader Classes

### Container

| Class | Description |
|-------|-------------|
| `.ph-item` | Placeholder item container |
| `.ph-item::before` | Shimmer animation base |

### Rows

| Class | Description |
|-------|-------------|
| `.ph-row` | Row placeholder container |
| `.ph-row div` | Individual row elements |

### Column Widths

| Class | Description |
|-------|-------------|
| `.ph-col-2` | 2 column width (16.66%) |
| `.ph-col-4` | 4 column width (33.33%) |
| `.ph-col-6` | 6 column width (50%) |
| `.ph-col-8` | 8 column width (66.66%) |
| `.ph-col-10` | 10 column width (83.33%) |
| `.ph-col-12` | 12 column width (100%) |

### Special Elements

| Class | Description |
|-------|-------------|
| `.ph-avatar` | Avatar placeholder |
| `.ph-picture` | Image/picture placeholder |
| `.ph-row .big` | Big placeholder element |
| `.ph-row .empty` | Empty placeholder |

## Usage Examples

### Basic Card Skeleton

```html
<div class="ph-item">
  <div class="ph-row">
    <div class="ph-col-12">
      <div class="ph-picture"></div>
    </div>
  </div>
  <div class="ph-row">
    <div class="ph-col-8">
      <div class="ph-row big"></div>
    </div>
  </div>
  <div class="ph-row">
    <div class="ph-col-6"></div>
  </div>
</div>
```

### Text Skeleton

```html
<div class="ph-item">
  <div class="ph-row">
    <div class="ph-col-12"></div>
  </div>
  <div class="ph-row">
    <div class="ph-col-12"></div>
  </div>
  <div class="ph-row">
    <div class="ph-col-8"></div>
  </div>
</div>
```

### Avatar with Text

```html
<div class="ph-item" style="display: flex; gap: 16px;">
  <div class="ph-avatar" style="width: 48px; height: 48px;"></div>
  <div style="flex: 1;">
    <div class="ph-row">
      <div class="ph-col-6"></div>
    </div>
    <div class="ph-row">
      <div class="ph-col-4"></div>
    </div>
  </div>
</div>
```

### List Skeleton

```html
<!-- Item 1 -->
<div class="ph-item">
  <div class="ph-row">
    <div class="ph-avatar"></div>
    <div class="ph-col-10">
      <div class="ph-row big"></div>
      <div class="ph-row"></div>
    </div>
  </div>
</div>

<!-- Repeat for more items -->
```

### Table Skeleton

```html
<div class="ph-item">
  <!-- Header -->
  <div class="ph-row">
    <div class="ph-col-3"></div>
    <div class="ph-col-3"></div>
    <div class="ph-col-3"></div>
    <div class="ph-col-3"></div>
  </div>
  <!-- Rows -->
  <div class="ph-row">
    <div class="ph-col-3"></div>
    <div class="ph-col-3"></div>
    <div class="ph-col-3"></div>
    <div class="ph-col-3"></div>
  </div>
  <!-- More rows... -->
</div>
```

### Product Card Skeleton

```html
<div class="ph-item">
  <div class="ph-row">
    <div class="ph-picture" style="height: 150px;"></div>
  </div>
  <div class="ph-row">
    <div class="ph-col-10 big"></div>
  </div>
  <div class="ph-row">
   ph-col-6"></div>
  <div class=" </div>
  <div class="ph-row">
    <div class="ph-col-4"></div>
  </div>
</div>
```

## Animation

The shimmer effect uses CSS animation:

```css
.ph-item::before {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.06) 100%
  );
  /* Animation applied */
}
```

## React Example

```jsx
const SkeletonCard = () => (
  <div className="ph-item">
    <div className="ph-row">
      <div className="ph-picture" style={{ height: 150 }} />
    </div>
    <div className="ph-row">
      <div className="ph-col-10 big" />
    </div>
    <div className="ph-row">
      <div className="ph-col-6" />
    </div>
  </div>
);

const ProductList = ({ loading }) => {
  if (loading) {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return <ProductList />;
};
```

## Best Practices

1. **Match actual content structure**: Skeleton should resemble real UI
2. **Use appropriate widths**: Match text/content length roughly
3. **Include all content types**: Images, avatars, text lines
4. **Keep animations smooth**: Don't make them too fast
5. **Use for all loading states**: Consistent loading experience

## Anti-Patterns

1. **Don't use random widths**: Match realistic content
2. **Don't skip skeleton**: Always show loading state
3. **Don't make animations distracting**: Subtle shimmer is better
4. **Don't forget mobile**: Ensure skeletons work on all sizes
5. **Don't use for error states**: Different treatment for errors
