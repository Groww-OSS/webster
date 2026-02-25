---
name: groww-ui-toolkit
description: Comprehensive React UI component library by Groww. Use for building consistent, accessible web applications with pre-built components. Contains atoms (Button, Input, CheckBox, etc.) and molecules (Calendar, Carousel, etc.).
---

# Groww UI Toolkit

A comprehensive React component library providing building blocks for modern web applications.

## Import All Components

```typescript
import { Button, TextInput, Select, CheckBox, Table, Tabs, Popup, Toast } from '@groww-tech/ui-toolkit';
```

## Package Structure

```
@groww-tech/ui-toolkit
├── components/
│   ├── atoms/           # Primitive components
│   └── molecules/       # Composite components
```

## Component Categories

### Form Components
| Component | Skill | Description |
|-----------|-------|-------------|
| Button | [groww-button](groww-button/) | Action buttons with variants |
| TextInput | [groww-text-input](groww-text-input/) | Text input fields |
| TextArea | [groww-text-area](groww-text-area/) | Multi-line text input |
| CheckBox | [groww-checkbox](groww-checkbox/) | Multi-select checkboxes |
| RadioButton | [groww-radio-button](groww-radio-button/) | Single-select radio buttons |
| Select | [groww-select](groww-select/) | Dropdown selection |
| ToggleSwitch | [groww-toggle-switch](groww-toggle-switch/) | Binary toggle |
| NumberInput | [groww-number-input](groww-number-input/) | Numeric input with stepper |
| Slider | [groww-slider](groww-slider/) | Range slider |
| DateSelector | [groww-date-selector](groww-date-selector/) | Date picker |

### Layout Components
| Component | Skill | Description |
|-----------|-------|-------------|
| Table | [groww-table](groww-table/) | Data tables |
| Tabs | [groww-tabs](groww-tabs/) | Tab navigation |
| Accordion | [groww-accordion](groww-accordion/) | Collapsible sections |

### Overlay Components
| Component | Skill | Description |
|-----------|-------|-------------|
| Popup/Modal | [groww-modal-popup](groww-modal-popup/) | Modal dialogs |
| Dropdown | [groww-dropdown](groww-dropdown/) | Dropdown menus |
| Popover | [groww-popover](groww-popover/) | Tooltips and popovers |
| Toast | [groww-toast](groww-toast/) | Notifications |

### Display Components
| Component | Skill | Description |
|-----------|-------|-------------|
| Image | [groww-image](groww-image/) | Images with lazy loading |
| Loader | [groww-loader](groww-loader/) | Loading spinners |
| ProgressBar | [groww-progress-bar](groww-progress-bar/) | Progress indicators |
| Tag/Pill | [groww-tag-pill](groww-tag-pill/) | Labels and badges |

### Navigation Components
| Component | Skill | Description |
|-----------|-------|-------------|
| Calendar | [groww-calendar](groww-calendar/) | Date picker |
| Carousel | [groww-carousel](groww-carousel/) | Image/content slider |
| IconButton | [groww-icon-button](groww-icon-button/) | Icon-only buttons |

### Interactive Components
| Component | Skill | Description |
|-----------|-------|-------------|
| Slider | [groww-slider](groww-slider/) | Range selection |

## Common Props Pattern

Most components follow these common patterns:

### Default Props
- `className?: string` - Custom CSS class
- `dataTestId?: string` - Test ID for automation
- `disabled?: boolean` - Disabled state

### Event Handlers
- `onChange?: (value: T) => void` - Value change callback
- `onClick?: () => void` - Click callback

### Display Options
- `size?: 'small' | 'medium' | 'large'` - Size variants
- `variant?: string` - Visual variant

## Theme Integration

The toolkit uses CSS variables from `@groww-tech/mint-css`. Ensure it's imported:

```typescript
import '@groww-tech/mint-css/dist/index.min.css';
```

Or in HTML:
```html
<link href="https://cdn.jsdelivr.net/npm/@groww-tech/mint-css/dist/index.min.css" rel="stylesheet">
```

## Accessibility

All components follow WCAG guidelines:
- Keyboard navigation
- Screen reader support
- Focus indicators
- Proper ARIA attributes

## Best Practices

1. **Use semantic components**: Button for actions, Link for navigation
2. **Follow size conventions**: Small (32px), Medium (40px), Large (48px)
3. **Provide labels**: Always label form inputs
4. **Handle loading states**: Show feedback during async operations
5. **Use variants appropriately**: Primary for main CTA, negative for destructive actions

## Anti-Patterns

1. **Don't override component internals**: Use documented props
2. **Don't skip error handling**: Always provide error states
3. **Don't forget validation**: Validate before submission
4. **Don't ignore accessibility**: Test with screen readers
5. **Don't use incorrect types**: Check component prop types