---
name: groww-checkbox
description: Checkbox component for boolean or multi-select inputs. Use when building forms with boolean toggles or multiple selection lists.
---

# Groww CheckBox Component

## Import Patterns

```typescript
import CheckBox from '@groww-tech/ui-toolkit/dist/esm/components/atoms/CheckBox';
import CheckBoxGroup from '@groww-tech/ui-toolkit/dist/esm/components/molecules/CheckBoxGroup';
// or
import { CheckBox, CheckBoxGroup } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (CheckBox)

```typescript
interface CheckBoxProps {
  value: string;                              // Checkbox value (required)
  isChecked: boolean;                        // Checked state (required)
  handleOnClick: (value: string, isChecked: boolean) => void;  // Change handler
  label?: React.ReactNode;                  // Label text/element
  size?: 'small' | 'medium' | 'large';       // Checkbox size
  isDisabled?: boolean;                      // Disabled state
  checkBoxDirection?: 'left' | 'right';     // Label position
  className?: string;
  dataTestId?: string;
  id?: string;
  name?: string;
}
```

### Props (CheckBoxGroup)

```typescript
interface CheckBoxGroupProps {
  checkBoxes: Array<{
    value: string;
    label: string;
    isChecked: boolean;
  }>;
  handleOnClick: (value: string, isChecked: boolean) => void;
  direction?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  containerClassName?: string;
  dataTestId?: string;
}
```

## Usage Examples

### Basic Checkbox
```tsx
<CheckBox
  value="agree"
  isChecked={isAgreed}
  handleOnClick={(value, checked) => setIsAgreed(checked)}
  label="I agree to the terms and conditions"
/>
```

### Checkbox with Right Label
```tsx
<CheckBox
  value="remember"
  isChecked={rememberMe}
  handleOnClick={setRememberMe}
  label="Remember me"
  checkBoxDirection="right"
/>
```

### Disabled Checkbox
```tsx
<CheckBox
  value="disabled"
  isChecked={false}
  handleOnClick={() => {}}
  label="This option is not available"
  isDisabled={true}
/>
```

### CheckBoxGroup
```tsx
<CheckBoxGroup
  checkBoxes={[
    { value: 'apple', label: 'Apple', isChecked: selections.includes('apple') },
    { value: 'banana', label: 'Banana', isChecked: selections.includes('banana') },
    { value: 'orange', label: 'Orange', isChecked: selections.includes('orange') },
  ]}
  handleOnClick={(value, checked) => {
    if (checked) {
      setSelections([...selections, value]);
    } else {
      setSelections(selections.filter(s => s !== value));
    }
  }}
  direction="vertical"
/>
```

## Anti-Patterns

1. **Don't forget handleOnClick**: Always provide change handler
2. **Don't use for single exclusive choice**: Use RadioButton instead
3. **Don't forget value prop**: Each checkbox needs a unique value
4. **Don't forget accessible label**: Always provide label for accessibility
5. **Don't mix with RadioButton in same group**: Use CheckBoxGroup for multi-select

## Accessibility

- Label associated with checkbox via id
- Focus indicators visible
- Keyboard activation (Space to toggle)
- Screen reader announces state changes
- Proper `role="checkbox"` attribute
