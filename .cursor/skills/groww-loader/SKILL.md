---
name: groww-loader
description: Loading spinner component for async operation states. Use during data fetching, form submissions, or any async operation.
---

# Groww Loader Component

## Import Patterns

```typescript
import Loader from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Loader';
// or
import { Loader } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface LoaderProps {
  size?: 'small' | 'medium' | 'large';   // Loader size
  color?: string;                       // Loader color
  className?: string;
}
```

## Usage Examples

### Basic Loader
```tsx
<Loader size="medium" />
```

### In Button
```tsx
<Button
  buttonText="Save"
  isLoading={true}
/>
```

### Full Screen Loader
```tsx
{isLoading && (
  <div className="loading-overlay">
    <Loader size="large" />
  </div>
)}
```

## Anti-Patterns

1. **Don't show for instant operations**: Only for actual loading
2. **Don't forget to hide**: Ensure loader disappears after load
3. **Don't use for progress**: Use ProgressBar instead
4. **Don't block without indication**: Always show loading state
