---
name: groww-calendar
description: Calendar component for date and month selection. Use when building date pickers, scheduling interfaces, or date range selectors.
---

# Groww Calendar Component

## Import Patterns

```typescript
import Calendar, { DateCalendar, MonthCalendar } from '@groww-tech/ui-toolkit/dist/esm/components/molecules/Calendar';
// or
import { Calendar, DateCalendar, MonthCalendar } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Calendar Types
- `'date'` - Full date picker with day selection
- `'month'` - Month/year picker only

### Props (Calendar)

```typescript
interface CalendarProps {
  type: 'date' | 'month';                  // Calendar type (required)
  selectedDate?: Date;                     // Currently selected date
  onDateSelect?: (date: Date) => void;    // Date selection handler
  minDate?: Date;                          // Minimum selectable date
  maxDate?: Date;                          // Maximum selectable date
  disabledDates?: Date[];                  // Array of disabled dates
  format?: string;                         // Date format string
  className?: string;
  dataTestId?: string;
}
```

### Props (DateCalendar)

```typescript
interface DateCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showYearView?: boolean;                  // Show year selection
  className?: string;
}
```

### Props (MonthCalendar)

```typescript
interface MonthCalendarProps {
  selectedMonth?: number;                  // 0-11
  selectedYear?: number;
  onMonthSelect?: (month: number, year: number) => void;
  minYear?: number;
  maxYear?: number;
  className?: string;
}
```

## Usage Examples

### Date Picker
```tsx
import Calendar from '@groww-tech/ui-toolkit/dist/esm/components/molecules/Calendar';

<Calendar
  type="date"
  selectedDate={selectedDate}
  onDateSelect={(date) => setSelectedDate(date)}
/>
```

### Month Picker
```tsx
<Calendar
  type="month"
  selectedDate={selectedDate}
  onDateSelect={(date) => setSelectedDate(date)}
/>
```

### With Date Range
```tsx
<Calendar
  type="date"
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
  minDate={new Date(2020, 0, 1)}
  maxDate={new Date(2030, 11, 31)}
/>
```

### Disabled Dates
```tsx
<Calendar
  type="date"
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
  disabledDates={[
    new Date(2024, 5, 15),
    new Date(2024, 5, 20),
  ]}
/>
```

## Anti-Patterns

1. **Don't forget to handle date format**: Match format to locale
2. **Don't forget minDate/maxDate**: Always set reasonable bounds
3. **Don't use for birth dates without limits**: Consider maxDate as today
4. **Don't forget disabled state**: Block past dates when needed
5. **Don't forget timezone handling**: Be consistent with date handling

## Accessibility

- Keyboard navigation (Arrow keys)
- Screen reader announcements
- Focus indicators
- Proper ARIA labels
- Date format announced to screen readers
