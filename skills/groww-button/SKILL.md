---
name: groww-button
description: Button component with variants, sizes, loading states, and icon support. Use when creating clickable actions, forms, or navigation buttons.
---

# Groww Button Component

## Import Patterns

```typescript
import Button from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Button';
// or
import { Button } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface ButtonProps {
  buttonText: string;                    // Button label (required)
  variant?: 'primary' | 'secondary' | 'tertiary' | 'negative';  // Button style variant
  size?: 'small' | 'medium' | 'large';   // Button size
  isLoading?: boolean;                   // Shows loading spinner
  disabled?: boolean;                    // Disables the button
  fullWidth?: boolean;                   // Full width button
  leadingIcon?: React.ReactNode;         // Icon before text
  trailingIcon?: React.ReactNode;        // Icon after text
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  dataTestId?: string;
}
```

### Variant Styles
- `primary`: Default action button (use for main CTA)
- `secondary`: Secondary action (use for less important actions)
- `tertiary`: Minimal styling (use for tertiary actions)
- `negative`: Destructive action (use for delete/cancel actions)

### Size Options
- `small`: Compact buttons (32px height)
- `medium`: Default (40px height)
- `large`: Prominent actions (48px height)

## Usage Examples

### Basic Button
```tsx
<Button
  buttonText="Submit"
  onClick={() => console.log('clicked')}
/>
```

### Loading State
```tsx
<Button
  buttonText="Save"
  isLoading={true}
  disabled={true}
/>
```

### With Icon
```tsx
import { IconName } from '@groww-tech/icon-store';

<Button
  buttonText="Add Item"
  leadingIcon={<IconName />}
/>
```

### Full Width
```tsx
<Button
  buttonText="Continue"
  fullWidth={true}
/>
```

## Anti-Patterns

1. **Don't use Button for navigation**: Use `<a>` tags or a router Link component instead
2. **Don't disable without visual feedback**: Always show disabled state clearly
3. **Don't use negative variant for non-destructive actions**: Reserve for delete/cancel operations
4. **Don't nest interactive elements**: Buttons should not contain other buttons or links
5. **Don't forget loading state for async actions**: Always show loading during API calls

## Accessibility

- Button has proper `type` attribute (default: 'button')
- Disabled buttons have `aria-disabled` set appropriately
- Focus states are managed automatically
- Keyboard navigation is supported (Enter/Space to activate)
