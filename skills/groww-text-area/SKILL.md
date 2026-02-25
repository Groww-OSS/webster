---
name: groww-text-area
description: Text area component for multi-line text input. Use for descriptions, comments, messages, or any long-form text entry.
---

# Groww TextArea Component

## Import Patterns

```typescript
import TextArea from '@groww-tech/ui-toolkit/dist/esm/components/atoms/TextArea';
// or
import { TextArea } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

Extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>` plus:

```typescript
interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  warning?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;                           // Number of visible rows
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  dataTestId?: string;
  id?: string;
  name?: string;
}
```

## Usage Examples

### Basic TextArea
```tsx
<TextArea
  value={description}
  onChange={setDescription}
  placeholder="Enter description..."
/>
```

### With Label
```tsx
<TextArea
  label="Bio"
  value={bio}
  onChange={setBio}
  placeholder="Tell us about yourself"
  rows={4}
  maxLength={500}
/>
```

### With Validation
```tsx
<TextArea
  label="Feedback"
  value={feedback}
  onChange={setFeedback}
  helperText="We appreciate your feedback"
  error={feedbackError || undefined}
/>
```

## Anti-Patterns

1. **Don't use for short inputs**: Use TextInput instead
2. **Don't forget resize handling**: Control resize with CSS
3. **Don't forget character limit**: Show counter for limits
4. **Don't forget label**: Always label for accessibility
5. **Don't use placeholder as label**: Use label prop instead
