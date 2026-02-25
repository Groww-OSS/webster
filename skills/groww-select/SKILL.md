---
name: groww-select
description: Select dropdown component for single selection from options. Use when user needs to choose one option from a list of predefined choices.
---

# Groww Select Component

## Import Patterns

```typescript
import Select from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Select';
// or
import { Select } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface SelectData {
  label: string;                           // Display text
  value: string | number;                 // Option value
  subContent?: React.ReactNode;          // Additional content
}

interface SelectProps {
  data: SelectData[];                      // Array of options (required)
  activeIndex?: number;                    // Currently selected index
  onSelect: (index: number, value: string | number) => void;  // Selection handler
  placeholder?: string;                   // Placeholder when nothing selected
  disabled?: boolean;                      // Disable the select
  showSearch?: boolean;                   // Show search input
  searchValue?: string;                   // Controlled search value
  onSearchChange?: (value: string) => void;  // Search change handler
  className?: string;
  dataTestId?: string;
  id?: string;
  name?: string;
}
```

## Usage Examples

### Basic Select
```tsx
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

<Select
  data={options}
  activeIndex={selectedIndex}
  onSelect={(index, value) => {
    setSelectedIndex(index);
    setValue(value);
  }}
/>
```

### With Placeholder
```tsx
<Select
  data={options}
  activeIndex={selectedIndex}
  onSelect={handleSelect}
  placeholder="Select an option"
/>
```

### With Search
```tsx
<Select
  data={options}
  activeIndex={selectedIndex}
  onSelect={handleSelect}
  showSearch={true}
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

### Controlled Select
```tsx
const [selectedIndex, setSelectedIndex] = useState(-1);

<Select
  data={options}
  activeIndex={selectedIndex}
  onSelect={(index, value) => setSelectedIndex(index)}
/>
```

## Anti-Patterns

1. **Don't forget onSelect handler**: Always provide selection callback
2. **Don't use for large datasets**: Consider virtualized select for 100+ items
3. **Don't forget to handle empty data**: Show appropriate empty state
4. **Don't use -1 as valid selection**: Typically means "no selection"
5. **Don't forget keyboard navigation**: Users expect arrow key support

## Accessibility

- Keyboard navigation (Arrow keys, Enter, Escape)
- Focus management
- Screen reader announcements for selection
- Proper label association

## Keyboard Navigation

- Arrow Up/Down: Navigate options
- Enter: Select current option
- Escape: Close dropdown
- Home/End: Jump to first/last option
