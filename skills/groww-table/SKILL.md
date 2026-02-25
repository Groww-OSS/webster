---
name: groww-table
description: Table component with header, body, footer, rows, and cells for tabular data display. Use when displaying structured data, lists, or reports.
---

# Groww Table Component

## Import Patterns

```typescript
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Table';
// or
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (Table)

```typescript
interface TableProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dataTestId?: string;
}
```

### Props (TableRow)

```typescript
interface TableRowProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
  dataTestId?: string;
}
```

### Props (TableCell)

```typescript
interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  colSpan?: number;
  rowSpan?: number;
  isHeader?: boolean;
}
```

### Props (TableHeaderCell)

```typescript
interface TableHeaderCellProps {
  children?: React.ReactNode;
  sortIcon?: React.ReactNode;
  onSortClick?: () => void;
  isSorted?: boolean;
  sortDirection?: 'asc' | 'desc';
  className?: string;
  style?: React.CSSProperties;
}
```

## Usage Examples

### Basic Table
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Email</TableHeaderCell>
      <TableHeaderCell>Status</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### With Footer
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Item</TableHeaderCell>
      <TableHeaderCell>Quantity</TableHeaderCell>
      <TableHeaderCell>Price</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>${item.price}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell></TableCell>
      <TableCell>${total}</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Sortable Headers
```tsx
<TableHeaderCell
  sortIcon={<SortIcon />}
  onSortClick={handleSort}
  isSorted={sorted}
  sortDirection="asc"
>
  Name
</TableHeaderCell>
```

### Clickable Row
```tsx
<TableRow onClick={() => handleRowClick(user)}>
  <TableCell>{user.name}</TableCell>
  <TableCell>{user.email}</TableCell>
</TableRow>
```

## Anti-Patterns

1. **Don't forget TableHeader**: Always wrap header cells in TableHeader
2. **Don't use div for table structure**: Use semantic Table components
3. **Don't forget key prop**: Each TableRow needs unique key
4. **Don't put interactive elements in cells without proper handling**: Be careful with click handlers
5. **Don't forget to handle empty state**: Show message for empty data

## Accessibility

- Proper semantic table structure
- Header cells use `<th>` elements
- Screen reader support for sorting
- Focus indicators for interactive rows
- Proper scope attributes for header cells
