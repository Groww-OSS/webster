---
name: groww-modal-popup
description: Modal dialog component with animations and overlay. Use when building dialogs, confirmations, or focused interactions that require user attention.
---

# Groww Modal/Popup Component

## Import Patterns

```typescript
import Popup from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Popup';
// or
import { Popup } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface PopupProps {
  visible: boolean;                         // Show/hide modal (required)
  onClose: () => void;                     // Close handler (required)
  width?: number | string;                 // Modal width
  height?: number | string;                // Modal height
  animation?: 'fade' | 'zoom' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'rotate' | 'door';
  closeMaskOnClick?: boolean;              // Close when clicking overlay
  closeOnEsc?: boolean;                    // Close on Escape key
  showCloseButton?: boolean;               // Show close X button
  customStyles?: React.CSSProperties;       // Custom styles
  className?: string;
  dataTestId?: string;
}
```

## Usage Examples

### Basic Modal
```tsx
const [isOpen, setIsOpen] = useState(false);

<Popup
  visible={isOpen}
  onClose={() => setIsOpen(false)}
>
  <h2>Confirm Action</h2>
  <p>Are you sure you want to proceed?</p>
  <button onClick={handleConfirm}>Confirm</button>
  <button onClick={() => setIsOpen(false)}>Cancel</button>
</Popup>
```

### With Custom Width
```tsx
<Popup
  visible={isOpen}
  onClose={handleClose}
  width={600}
  height="auto"
>
  <ConfirmationDialog />
</Popup>
```

### Different Animations
```tsx
// Slide up from bottom
<Popup
  visible={isOpen}
  onClose={handleClose}
  animation="slideUp"
>
  <BottomSheetContent />
</Popup>

// Zoom effect
<Popup
  visible={isOpen}
  onClose={handleClose}
  animation="zoom"
>
  <CenteredContent />
</Popup>
```

### With Overlay Click Close
```tsx
<Popup
  visible={isOpen}
  onClose={handleClose}
  closeMaskOnClick={true}
  closeOnEsc={true}
>
  <ModalContent />
</Popup>
```

### Full Screen Modal
```tsx
<Popup
  visible={isOpen}
  onClose={handleClose}
  width="100vw"
  height="100vh"
>
  <FullScreenContent />
</Popup>
```

## Anti-Patterns

1. **Don't forget onClose handler**: Always provide close callback
2. **Don't use for simple notifications**: Use Toast instead
3. **Don't forget to handle visibility**: Use controlled visible prop
4. **Don't nest modals**: Creates accessibility issues
5. **Don't forget to focus trap**: Should trap focus in modal when open

## Accessibility

- Focus trap in modal
- Escape key closes modal
- Body scroll lock when open
- ARIA modal role
- Proper focus management (restore focus on close)
- Screen reader announcements

## Common Patterns

### Confirmation Dialog
```tsx
<Popup
  visible={isOpen}
  onClose={handleClose}
  showCloseButton={true}
  width={400}
>
  <div className="dialog-content">
    <Icon type="warning" size="large" />
    <h3>Delete Item?</h3>
    <p>This action cannot be undone.</p>
    <div className="actions">
      <Button variant="secondary" buttonText="Cancel" onClick={handleClose} />
      <Button variant="negative" buttonText="Delete" onClick={handleDelete} />
    </div>
  </div>
</Popup>
```

### Form Modal
```tsx
<Popup
  visible={isOpen}
  onClose={handleClose}
  width={500}
>
  <h2>Edit Profile</h2>
  <form onSubmit={handleSubmit}>
    <TextInput label="Name" value={name} onChange={setName} />
    <TextInput label="Email" value={email} onChange={setEmail} />
    <Button buttonText="Save" type="submit" />
  </form>
</Popup>
```
