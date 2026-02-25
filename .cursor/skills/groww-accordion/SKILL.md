---
name: groww-accordion
description: Accordion component with collapsible sections. Use for FAQs, nested content, or expandable details sections.
---

# Groww Accordion Component

## Import Patterns

```typescript
import Accordion from '@groww-tech/ui-toolkit/dist/esm/components/atoms/Accordion';
// or
import { Accordion } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props

```typescript
interface AccordionProps {
  isOpen: boolean;                         // Open/close state (required)
  children: React.ReactNode;               // Accordion content (required)
  header: React.ReactNode;                // Header content
  onChange?: (isOpen: boolean) => void;   // State change handler
  className?: string;
  duration?: number;                      // Animation duration (ms)
}
```

### AnimateHeight (Sub-component)

```typescript
interface AnimateHeightProps {
  height?: number | 'auto';               // Height value
  duration?: number;                       // Animation duration
  easing?: string;                        // Easing function
  animateOpacity?: boolean;               // Animate opacity
  id?: string;
  className?: string;
}
```

## Usage Examples

### Basic Accordion
```tsx
<Accordion
  isOpen={isOpen}
  onChange={(open) => setIsOpen(open)}
  header={
    <div className="accordion-header">
      <span>What is Groww?</span>
      <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
    </div>
  }
>
  <div className="accordion-content">
    Groww is an investment platform...
  </div>
</Accordion>
```

### Multiple Accordions
```tsx
{faqs.map((faq, index) => (
  <Accordion
    key={index}
    isOpen={openIndex === index}
    onChange={(isOpen) => setOpenIndex(isOpen ? index : -1)}
    header={faq.question}
  >
    {faq.answer}
  </Accordion>
))}
```

## Anti-Patterns

1. **Don't nest accordions**: Creates UX issues
2. **Don't forget header**: Content needs click target
3. **Don't forget onChange**: Always handle state changes
4. **Don't use for single section**: Consider simple show/hide
5. **Don't forget animation**: Improves user experience

## Accessibility

- Keyboard navigation (Enter, Space to toggle)
- Focus indicators
- ARIA expanded attribute
- Proper heading hierarchy
