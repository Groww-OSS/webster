---
name: groww-dropdown
description: Dropdown menu component with trigger and content pattern. Use when building selectable menus, action menus, or nested navigation.
---

# Groww Dropdown Component

## Import Patterns

```typescript
import Dropdown, { DropdownTrigger, DropdownContent } from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Dropdown';
import DropdownV2 from '@groww-tech/ui-toolkit/dist/esm/components/atoms/DropdownV2';
// or
import { Dropdown, DropdownV2 } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (Dropdown)

```typescript
interface DropdownProps {
  children: React.ReactNode[];              // DropdownTrigger and DropdownContent
  disabled?: boolean;                       // Disable the dropdown
  active?: boolean;                        // Controlled open state
  onHide?: () => void;                     // Called when dropdown closes
  onShow?: () => void;                    // Called when dropdown opens
  className?: string;
  style?: React.CSSProperties;
  dataTestId?: string;
}

interface DropdownTriggerProps {
  children: React.ReactNode;               // Trigger content (button/icon)
  addMenuRef?: (ref: HTMLDivElement) => void;
}

interface DropdownContentProps {
  children: React.ReactNode;               // Dropdown menu items
  addMenuRef?: (ref: HTMLDivElement) => void;
  className?: string;
}
```

### Props (DropdownV2)

```typescript
interface DropdownV2Props {
  children: React.ReactNode[];            // DropdownTrigger and DropdownContent
  disabled?: boolean;
  active?: boolean;                        // Controlled state
  position?: 'top' | 'bottom';            // Vertical position
  horizontalPosition?: 'left' | 'right';  // Horizontal alignment
  onHide?: () => void;
  onShow?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
```

## Usage Examples

### Basic Dropdown
```tsx
<Dropdown
  active={isOpen}
  onHide={() => setIsOpen(false)}
  onShow={() => setIsOpen(true)}
>
  <DropdownTrigger>
    <Button buttonText="Open Menu" />
  </DropdownTrigger>
  <DropdownContent>
    <div onClick={() => handleAction()}>Action 1</div>
    <div onClick={() => handleAction()}>Action 2</div>
    <div onClick={() => handleAction()}>Action 3</div>
  </DropdownContent>
</Dropdown>
```

### Icon Menu
```tsx
import { MoreVerticalIcon } from '@groww-tech/icon-store';

<Dropdown
  active={isMenuOpen}
  onHide={() => setIsMenuOpen(false)}
>
  <DropdownTrigger>
    <IconButton icon={MoreVerticalIcon} />
  </DropdownTrigger>
  <DropdownContent>
    <MenuItem icon={<EditIcon />} label="Edit" onClick={handleEdit} />
    <MenuItem icon={<DeleteIcon />} label="Delete" onClick={handleDelete} />
  </DropdownContent>
</Dropdown>
```

### Positioned DropdownV2
```tsx
<DropdownV2
  active={isOpen}
  position="bottom"
  horizontalPosition="right"
  onHide={() => setIsOpen(false)}
>
  <DropdownTrigger>
    <span>Click me</span>
  </DropdownTrigger>
  <DropdownContent>
    {menuItems}
  </DropdownContent>
</DropdownV2>
```

## Anti-Patterns

1. **Don't forget to control active state**: Always manage open/close state
2. **Don't nest dropdowns in dropdowns**: This creates UX issues
3. **Don't put interactive elements in trigger**: Trigger should only contain the toggle
4. **Don't forget to close on outside click**: Let the component handle this
5. **Don't use for navigation**: Use separate navigation components

## Accessibility

- Keyboard navigation (Escape to close)
- Focus management (trap focus in open dropdown)
- ARIA attributes for screen readers
- Proper role="menu" on content
