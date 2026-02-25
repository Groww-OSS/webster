---
name: groww-text-input
description: Text input component with validation, icons, error states, and multiple variants. Use when building forms, search inputs, or text entry fields.
---

# Groww TextInput Component

## Import Patterns

```typescript
import TextInput from '@groww-tech/ui-toolkit/dist/esm/components/atoms/TextInput';
import TextInputV1 from '@groww-tech/ui-toolkit/dist/esm/components/atoms/TextInputV1';
// or
import { TextInput, TextInputV1 } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (TextInput)

```typescript
interface TextInputProps {
  value?: string;                              // Controlled value
  onChange?: (value: string) => void;          // Change handler
  placeholder?: string;                        // Placeholder text
  label?: string;                              // Input label
  helperText?: string;                        // Helper text below input
  error?: string;                             // Error message (shows error state)
  warning?: string;                           // Warning message
  disabled?: boolean;                          // Disabled state
  required?: boolean;                          // Required field indicator
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;                 // Icon on left
  rightIcon?: React.ReactNode;                // Icon on right
  showClearIcon?: boolean;                    // Show clear button
  onClear?: () => void;                       // Clear handler
  maxLength?: number;                         // Character limit
  autoFocus?: boolean;                        // Auto focus on mount
  dataTestId?: string;
  id?: string;
  name?: string;
  className?: string;
  inputClassName?: string;
}
```

### TextInputV1 (Legacy Version)

```typescript
interface TextInputV1Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  isError?: boolean;                          // Error state
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shouldValidate?: boolean;                  // Show validation
  onEnterPress?: () => void;                  // Enter key handler
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}
```

## Usage Examples

### Basic Input
```tsx
<TextInput
  value={value}
  onChange={setValue}
  placeholder="Enter your name"
/>
```

### With Label and Validation
```tsx
<TextInput
  label="Email"
  value={email}
  onChange={setEmail}
  type="email"
  helperText="We'll never share your email"
  required={true}
/>
```

### Error State
```tsx
<TextInput
  label="Username"
  value={username}
  onChange={setUsername}
  error={usernameError || undefined}
/>
```

### With Icons
```tsx
import { SearchIcon, CloseIcon } from '@groww-tech/icon-store';

<TextInput
  leftIcon={<SearchIcon />}
  rightIcon={value && <CloseIcon onClick={() => setValue('')} />}
  placeholder="Search..."
  showClearIcon={true}
  onClear={() => setValue('')}
/>
```

### Password Input
```tsx
<TextInput
  type="password"
  value={password}
  onChange={setPassword}
  label="Password"
  required={true}
/>
```

## Anti-Patterns

1. **Don't mix TextInput and TextInputV1**: Use one version consistently
2. **Don't forget to handle empty string**: Check for `undefined` vs `''` in controlled inputs
3. **Don't skip error handling**: Always provide meaningful error messages
4. **Don't use placeholder as labels**: Use the `label` prop for accessibility
5. **Don't forget type for mobile keyboards**: Use correct `type` for appropriate keyboard

## Accessibility

- Label is associated with input via `htmlFor`/`id`
- Error messages are announced to screen readers
- Required fields are marked with `aria-required`
- Focus indicators are visible
- Helper text is associated with input
