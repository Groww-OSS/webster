---
name: groww-popover
description: Popover and tooltip component for floating content. Use for contextual information, tooltips, or overflow menus.
---

# Groww Popover Component

## Import Patterns

```typescript
import Popover from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Popover';
// or
import { Popover } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface PopoverProps {
  content: React.ReactNode;               // Popover content
  children: React.ReactNode;              // Trigger element
  position?: 'top' | 'bottom' | 'left' | 'right';  // Position
  trigger?: 'hover' | 'click';            // Trigger type
  className?: string;
}
```

## Usage Examples

### Basic Popover
```tsx
<Popover
  content={<div>Popover content here</div>}
  position="top"
>
  <Button buttonText="Hover me" />
</Popover>
```

### Click Trigger
```tsx
<Popover
  content={menuContent}
  trigger="click"
  position="bottom"
>
  <IconButton icon={MoreIcon} />
</Popover>
```
