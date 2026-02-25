---
name: groww-toast
description: Toast notification component for temporary feedback messages. Use for success confirmations, error alerts, warnings, and informational notices.
---

# Groww Toast/Toaster Component

## Import Patterns

```typescript
import Toast, { ToastProps } from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Toast';
import Toaster, { ToasterProps } from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Toaster';
import Toastify from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Toastify';
// or
import { Toast, Toaster, Toastify } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Toast Types
- `'success'` - Green, for successful operations
- `'error'` - Red, for errors and failures
- `'warning'` - Orange, for warnings
- `'info'` - Blue, for informational messages
- `'default'` - Default gray style

### Props (Toaster)

```typescript
interface ToasterProps {
  closeToast?: () => void;
  toastId?: string | number;
  autoClose?: number | false;              // Auto close delay (ms)
  closeOnClick?: boolean;                  // Close on click
  type?: 'success' | 'error' | 'warning' | 'info' | 'default';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
```

### Props (Toast)

```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  message: string;                          // Toast message
  isVisible?: boolean;                      // Visibility state
  onClose?: () => void;                    // Close handler
  duration?: number;                       // Display duration
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Toastify Usage

Toastify uses a different API - it provides a functional interface:

```typescript
import Toastify from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Toastify';

// Show toast
Toastify.show({
  message: 'Operation successful!',
  type: 'success',
  duration: 3000,
});

// Methods
Toastify.success(message, duration?);
Toastify.error(message, duration?);
Toastify.warning(message, duration?);
Toastify.info(message, duration?);
Toastify.default(message, duration?);
Toastify.hide(); // Hide current toast
```

## Usage Examples

### Using Toast Component
```tsx
<Toast
  type="success"
  message="Settings saved successfully"
  isVisible={showToast}
  onClose={() => setShowToast(false)}
  duration={3000}
/>
```

### Using Toaster
```tsx
<Toaster
  type="error"
  message="Failed to save changes"
  closeToast={() => setShowToast(false)}
  autoClose={5000}
/>
```

### Using Toastify
```tsx
// Success toast
Toastify.success('Profile updated!');

// Error toast
Toastify.error('Something went wrong. Please try again.');

// Warning toast
Toastify.warning('Your session will expire soon.');

// With action
Toastify.show({
  message: 'New message received',
  type: 'info',
  action: {
    label: 'View',
    onClick: () => navigateToMessages(),
  },
});
```

## Anti-Patterns

1. **Don't overuse toasts**: Reserve for important feedback only
2. **Don't put critical actions in toasts**: Use modals for confirmations
3. **Don't use for form validation errors**: Show inline errors instead
4. **Don't set duration too short**: Give users time to read (2-5 seconds)
5. **Don't stack too many toasts**: Limit to 3 visible at once

## Best Practices

- **Success**: "Item saved", "Changes applied", "Operation complete"
- **Error**: "Failed to load data", "Network error", "Invalid input"
- **Warning**: "Session expiring", "Unsaved changes", "Limit reached"
- **Info**: "New feature available", "Update ready", "Reminder"

## Positioning

- Top-right: Most common for desktop
- Top-left: Alternative for left-aligned UIs
- Bottom-right: For less intrusive notifications
- Bottom-left: Rarely used

## Accessibility

- Screen reader announcements
- Focus management
- Keyboard dismissible (Escape)
- Sufficient color contrast
- No auto-play sounds
