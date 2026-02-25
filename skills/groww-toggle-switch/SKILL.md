---
name: groww-toggle-switch
description: Toggle switch component for binary on/off states. Use for settings, preferences, boolean options, or feature toggles.
---

# Groww ToggleSwitch Component

## Import Patterns

```typescript
import ToggleSwitch from '@groww-tech/ui-toolkit/dist/esm/components/atoms/ToggleSwitch';
// or
import { ToggleSwitch } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface ToggleSwitchProps {
  isEnabled: boolean;                     // Current state (required)
  handleOnClick: (isEnabled: boolean) => void;  // Toggle handler
  isDisabled?: boolean;                   // Disabled state
  size?: 'small' | 'medium' | 'large';   // Toggle size
  className?: string;
  dataTestId?: string;
  id?: string;
  name?: string;
}
```

## Usage Examples

### Basic Toggle
```tsx
<ToggleSwitch
  isEnabled={isEnabled}
  handleOnClick={(enabled) => setEnabled(enabled)}
/>
```

### With Label
```tsx
<div className="setting-row">
  <span>Enable notifications</span>
  <ToggleSwitch
    isEnabled={notificationsEnabled}
    handleOnClick={setNotificationsEnabled}
  />
</div>
```

### Disabled Toggle
```tsx
<ToggleSwitch
  isEnabled={false}
  handleOnClick={() => {}}
  isDisabled={true}
/>
```

### Controlled State
```tsx
const [isOn, setIsOn] = useState(false);

<ToggleSwitch
  isEnabled={isOn}
  handleOnClick={(enabled) => {
    setIsOn(enabled);
    trackToggle(enabled);
  }}
/>
```

## Anti-Patterns

1. **Don't use for navigation**: Use links/buttons instead
2. **Don't forget handleOnClick**: Always provide toggle handler
3. **Don't use for gradual transitions**: Use a button or link
4. **Don't forget disabled state**: Show clearly when toggled off
5. **Don't forget label association**: Always pair with clear label

## Accessibility

- Keyboard activation (Space, Enter)
- Focus indicators
- Screen reader announces state ("on"/"off")
- Proper role="switch" attribute
- Label properly associated
