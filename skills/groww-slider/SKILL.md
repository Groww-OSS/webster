---
name: groww-slider
description: Slider component for selecting values from a range. Use for price ranges, volume controls, or any continuous value selection.
---

# Groww Slider Component

## Import Patterns

```typescript
import Slider from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Slider';
// or
import { Slider } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface SliderProps {
  value?: number | number[];               // Current value(s)
  onChange?: (value: number | number[]) => void;
  min?: number;                            // Minimum value (default: 0)
  max?: number;                            // Maximum value (default: 100)
  step?: number;                           // Step size
  disabled?: boolean;
  className?: string;
  dataTestId?: string;
}
```

## Usage Examples

### Single Value
```tsx
<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
/>
```

### Range Selection
```tsx
<Slider
  value={[minPrice, maxPrice]}
  onChange={setPriceRange}
  min={0}
  max={1000}
  step={10}
/>
```

## Anti-Patterns

1. **Don't forget min/max**: Always bound the range
2. **Don't forget step**: For discrete values
3. **Don't forget accessibility**: Keyboard navigation important
4. **Don't use for exact values**: NumberInput better for precision