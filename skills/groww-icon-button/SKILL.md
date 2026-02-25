---
name: groww-icon-button
description: Icon-only button component for actions. Use for toolbars, navigation bars, or compact action buttons without text.
---

# Groww IconButton Component

## Import Patterns

```typescript
import IconButton from '@groww-tech/ui-toolkit/dist/esm/components/atoms/IconButton';
// or
import { IconButton } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface IconButtonProps {
  icon: ReactIconComponentType;            // Icon component (required)
  size?: 'small' | 'medium' | 'large';   // Button size
  onClick?: () => void;                   // Click handler
  isDisabled?: boolean;                   // Disabled state
  isLoading?: boolean;                    // Loading state
  className?: string;
  dataTestId?: string;
  id?: string;
  title?: string;                         // Tooltip/title
  type?: 'button' | 'submit' | 'reset';
}
```

## Usage Examples

### Basic IconButton
```tsx
import { SearchIcon, CloseIcon, EditIcon } from '@groww-tech/icon-store';

<IconButton
  icon={SearchIcon}
  onClick={() => handleSearch()}
/>
```

### With Tooltip
```tsx
<IconButton
  icon={EditIcon}
  onClick={handleEdit}
  title="Edit item"
/>
```

### Loading State
```tsx
<IconButton
  icon={SaveIcon}
  onClick={handleSave}
  isLoading={true}
/>
```

### Disabled State
```tsx
<IconButton
  icon={DeleteIcon}
  onClick={handleDelete}
  isDisabled={true}
/>
```

## Anti-Patterns

1. **Don't forget title/tooltip**: Icons need context
2. **Don't use for primary actions**: Use Button for main CTAs
3. **Don't forget disabled state**: Show clearly when disabled
4. **Don't use loading for long operations**: Consider using Button
5. **Don't use without clear action**: Icon should indicate action

## Accessibility

- Keyboard activation (Enter, Space)
- Focus indicators
- Screen reader reads title or aria-label
- Proper button role
