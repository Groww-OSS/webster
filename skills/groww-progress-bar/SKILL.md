---
name: groww-progress-bar
description: Progress bar component for showing completion status. Use for file uploads, multi-step forms, loading states, or task progress.
---

# Groww ProgressBar Component

## Import Patterns

```typescript
import ProgressBar from '@groww-tech/ui-toolkit/dist/esm/components/atoms/ProgressBar';
// or
import { ProgressBar } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface ProgressBarProps {
  value: number;                            // Progress value 0-100
  width?: number | string;                 // Bar width
  height?: number | string;                // Bar height
  showProgressValue?: boolean;             // Show percentage text
  fillColor?: string;                      // Progress fill color
  backgroundColor?: string;                // Track background color
  className?: string;
  dataTestId?: string;
}
```

## Usage Examples

### Basic Progress Bar
```tsx
<ProgressBar value={50} />
```

### With Custom Styling
```tsx
<ProgressBar
  value={75}
  width={300}
  height={8}
  fillColor="#4CAF50"
  backgroundColor="#E0E0E0"
/>
```

### Show Value
```tsx
<ProgressBar
  value={progress}
  showProgressValue={true}
/>
```

### Linear vs Circular
The component supports both linear (default) and circular variants through CSS customization.

## Anti-Patterns

1. **Don't use for indefinite loading**: Use Loader instead
2. **Don't set value > 100**: Clamp between 0-100
3. **Don't forget error state**: Show error for failed operations
4. **Don't animate manually**: Let component handle transitions
5. **Don't use for navigation**: Not interactive

## Accessibility

- Screen reader announces progress
- Progress value is accessible
- Focus indicators
- Proper ARIA attributes (aria-valuenow, aria-valuemin, aria-valuemax)
