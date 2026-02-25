---
name: groww-tag-pill
description: Tag and Pill components for labels, badges, and status indicators. Use for categories, status labels, or inline metadata.
---

# Groww Tag and Pill Components

## Import Patterns

```typescript
import Tag from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Tag';
import Pill from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Pill';
// or
import { Tag, Pill } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (Tag)

```typescript
interface TagProps {
  children: React.ReactNode;               // Tag content
  isWarning?: boolean;                    // Warning variant (yellow/orange)
  isError?: boolean;                     // Error variant (red)
  isInfo?: boolean;                      // Info variant (blue)
  tagClass?: string;                     // Custom class
  className?: string;
}
```

### Props (Pill)

```typescript
interface PillProps {
  children: React.ReactNode;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  onRemove?: () => void;                 // Remove button callback
  size?: 'small' | 'medium';
  className?: string;
}
```

## Usage Examples

### Tag Variants
```tsx
// Default
<Tag>New</Tag>

// Warning
<Tag isWarning>Pending</Tag>

// Error
<Tag isError>Failed</Tag>

// Info
<Tag isInfo>In Progress</Tag>
```

### Pill
```tsx
// Basic pill
<Pill>Active</Pill>

// With type
<Pill type="success">Verified</Pill>

// Removable pill
<Pill onRemove={() => handleRemove(tagId)}>
  Removable
</Pill>
```

## Anti-Patterns

1. **Don't overuse**: Too many tags clutter UI
2. **Don't use for actions**: Use buttons instead
3. **Don't forget color meaning**: Consistent color = consistent meaning
4. **Don't forget accessibility**: Ensure screen readers can read
5. **Don't mix Tag and Pill**: Choose one and use consistently
