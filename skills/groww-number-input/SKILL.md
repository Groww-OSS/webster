---
name: groww-number-input
description: Number input component with increment/decrement controls. Use for numeric values, quantities, or any numeric input with stepper controls.
---

# Groww NumberInput and InputStepper Components

## Import Patterns

```typescript
import NumberInput from '@groww-tech/ui-toolkit/dist/esm/components/atoms/NumberInput';
import InputStepper from '@groww-tech/ui-toolkit/dist/esm/components/atoms/InputStepper';
// or
import { NumberInput, InputStepper } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (NumberInput)

```typescript
interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  allowDecimal?: boolean;
  decimalPlaces?: number;
}
```

### Props (InputStepper)

```typescript
interface InputStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'small' | 'medium';
}
```

## Usage Examples

### NumberInput
```tsx
<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={0}
  max={100}
  step={1}
/>
```

### InputStepper
```tsx
<InputStepper
  value={count}
  onChange={setCount}
  min={1}
  max={10}
/>
```

## Anti-Patterns

1. **Don't forget min/max**: Always constrain values
2. **Don't forget step**: Define increment size
3. **Don't allow invalid input**: Validate on change
4. **Don't forget decimal handling**: For currency/percentage inputs