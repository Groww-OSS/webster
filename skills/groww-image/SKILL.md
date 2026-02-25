---
name: groww-image
description: Image component with lazy loading, dark mode support, and error handling. Use for displaying images with optimized loading.
---

# Groww Image Component

## Import Patterns

```typescript
import Image from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Image';
// or
import { Image } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface ImageProps {
  src: string;                              // Image source (required)
  alt: string;                              // Alt text (required)
  width?: number | string;                 // Image width
  height?: number | string;                // Image height
  srcDark?: string;                        // Dark mode image
  addClass?: string;                       // Light mode class
  addClassDark?: string;                   // Dark mode class
  useLazyLoad?: boolean;                   // Lazy load (default: true)
  className?: string;
}
```

## Usage Examples

### Basic Image
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={200}
  height={150}
/>
```

### With Dark Mode
```tsx
<Image
  src="/logo-light.png"
  srcDark="/logo-dark.png"
  alt="Logo"
  width={100}
  height={40}
/>
```

### Without Lazy Load
```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width="100%"
  height={400}
  useLazyLoad={false}
/>
```

## Anti-Patterns

1. **Don't forget alt text**: Always provide meaningful alt
2. **Don't omit dimensions**: Prevents layout shift
3. **Don't use for decorative images only**: Use CSS background
4. **Don't forget dark mode images**: For theme-sensitive images
