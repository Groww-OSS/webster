---
name: groww-tabs
description: Tab navigation component for organizing content into switchable panels. Use when building settings pages, dashboards, or content that needs categorization.
---

# Groww Tabs Component

## Import Patterns

```typescript
import Tabs from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Tabs';
// or
import { Tabs } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface Tab {
  name: React.ReactNode;                 // Tab label
  description?: string;                   // Optional description
  style?: React.CSSProperties;            // Custom styles
  width?: string | number;                // Tab width
  left?: React.ReactNode;                 // Content on left
  disabled?: boolean;                     // Disable tab
}

interface TabsProps {
  data: Tab[];                            // Array of tabs (required)
  onTabSelect: (index: number) => void;   // Tab change handler
  activeTabIndex?: number;                 // Controlled active index
  showBottomBorder?: boolean;              // Show bottom border
  activeTabIndexOnMount?: number;          // Initial active tab
  isHorizScrollable?: boolean;            // Horizontal scroll
  className?: string;
  dataTestId?: string;
}
```

## Usage Examples

### Basic Tabs
```tsx
const tabs = [
  { name: 'Overview' },
  { name: 'Details' },
  { name: 'Settings' },
];

<Tabs
  data={tabs}
  onTabSelect={(index) => setActiveTab(index)}
  activeTabIndex={activeTab}
/>
```

### With Descriptions
```tsx
const tabs = [
  { name: 'Profile', description: 'Manage your account' },
  { name: 'Security', description: 'Password and 2FA' },
  { name: 'Notifications', description: 'Email preferences' },
];

<Tabs data={tabs} onTabSelect={handleTabChange} />
```

### Initial Active Tab
```tsx
<Tabs
  data={tabs}
  onTabSelect={handleTabChange}
  activeTabIndexOnMount={1}  // Start with second tab
/>
```

### With Custom Width
```tsx
const tabs = [
  { name: 'Short' },
  { name: 'Much Longer Tab Name', width: 200 },
];

<Tabs data={tabs} onTabSelect={handleTabChange} />
```

## Panel Rendering Pattern

```tsx
const renderContent = () => {
  switch (activeTab) {
    case 0:
      return <OverviewPanel />;
    case 1:
      return <DetailsPanel />;
    case 2:
      return <SettingsPanel />;
    default:
      return null;
  }
};

return (
  <>
    <Tabs data={tabs} onTabSelect={setActiveTab} activeTabIndex={activeTab} />
    <div className="tab-content">
      {renderContent()}
    </div>
  </>
);
```

## Anti-Patterns

1. **Don't forget onTabSelect handler**: Always provide change callback
2. **Don't use too many tabs**: Consider overflow menu for 5+ tabs
3. **Don't forget content for each tab**: Always show relevant content
4. **Don't mix controlled and uncontrolled**: Choose one pattern
5. **Don't forget to sync activeTabIndex**: In controlled mode

## Accessibility

- Keyboard navigation (Arrow keys)
- Focus indicators
- ARIA tablist/tab/tabpanel roles
- Screen reader announces active tab
- Tab content is properly associated
