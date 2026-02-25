---
name: groww-radio-button
description: Radio button component for single selection from mutually exclusive options. Use when user must choose exactly one option from a list.
---

# Groww RadioButton Components

## Import Patterns

```typescript
import RadioButton from '@groww-tech/ui-toolkit/dist/esm/components/atoms/RadioButton';
import RadioButtonGroup from '@groww-tech/ui-toolkit/dist/esm/components/molecules/RadioButtonGroup';
// or
import { RadioButton, RadioButtonGroup } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (RadioButton)

```typescript
interface RadioButtonProps {
  value: string;                              // Radio button value
  isChecked: boolean;                        // Checked state
  handleOnClick: (value: string, isChecked: boolean) => void;
  label?: React.ReactNode;                  // Label text/element
  size?: 'small' | 'medium' | 'large';       // Radio button size
  isDisabled?: boolean;                      // Disabled state
  radioButtonDirection?: 'left' | 'right';  // Label position
  className?: string;
  dataTestId?: string;
  id?: string;
  name?: string;
}
```

### Props (RadioButtonGroup)

```typescript
interface RadioButtonType {
  value: string | number;
  label: string;
  isDisabled?: boolean;
}

interface RadioButtonGroupProps {
  radioButtons: RadioButtonType[];          // Array of options
  selected?: string | number;               // Selected value
  onSelect: (value: string | number) => void;  // Selection handler
  containerClassName?: string;
  dataTestId?: string;
  name?: string;
}
```

## Usage Examples

### Basic RadioButton
```tsx
<RadioButton
  value="option1"
  isChecked={selected === 'option1'}
  handleOnClick={(value) => setSelected(value)}
  label="Option 1"
/>
```

### RadioButtonGroup (Recommended)
```tsx
const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

<RadioButtonGroup
  radioButtons={options}
  selected={frequency}
  onSelect={(value) => setFrequency(value)}
/>
```

### With Disabled Option
```tsx
const options = [
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise', isDisabled: true },
];

<RadioButtonGroup
  radioButtons={options}
  selected={plan}
  onSelect={setPlan}
/>
```

### Label on Right
```tsx
<RadioButton
  value="agree"
  isChecked={isAgreed}
  handleOnClick={(value) => setIsAgreed(true)}
  label="I agree to the terms"
  radioButtonDirection="right"
/>
```

## Anti-Patterns

1. **Don't use for multi-select**: Use CheckBox instead
2. **Don't forget handleOnClick**: Always provide selection handler
3. **Don't use without label**: Always provide accessible label
4. **Don't forget to group**: Use RadioButtonGroup for related options
5. **Don't use for optional selections**: Use CheckBox when nothing is valid

## Accessibility

- Label associated with radio via id
- Grouped with same name attribute
- Focus indicators visible
- Keyboard navigation (Arrow keys within group)
- Screen reader announces selection
- Proper role="radio" attribute
