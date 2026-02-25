---
name: mint-css-typography
description: Typography system with font families, sizes, and token classes. Use for consistent text styling across the application.
---

# Mint CSS Typography System

## Import

```css
/* Full import */
import '@groww-tech/mint-css/dist/index.css';

/* Typography only */
@import '@groww-tech/mint-css/dist/typography/index.css';

/* Font faces */
@import '@groww-tech/mint-css/dist/fragments/fonts.css';

/* Typography tokens */
@import '@groww-tech/mint-css/dist/typography/tokens/body-tokens.css';
@import '@groww-tech/mint-css/dist/typography/tokens/heading-tokens.css';
@import '@groww-tech/mint-css/dist/typography/tokens/display-tokens.css';
@import '@groww-tech/mint-css/dist/typography/tokens/button-tokens.css';
```

## Font Families

### Available Fonts

| Font | Type | Usage |
|------|------|-------|
| `GrowwSans` | Variable | Primary font (supports weights via font-variation-settings) |
| `NotoSans` | Multiple weights | Primary sans-serif |
| `Soehne` | Regular | Secondary font |

### Font Weights

| Weight | Name | Value |
|--------|------|-------|
| Regular | Normal | 400 |
| Medium | Medium | 500 |
| SemiBold | SemiBold | 600 |

### Unicode Support

- Devanagari script (Hindi): `U+0900-097F`

## Body Typography Tokens

Use these classes for body text:

| Class | Description | Font Size | Weight |
|-------|-------------|-----------|--------|
| `.bodySmall` | Small body text | 12pts | Regular |
| `.bodySmallHeavy` | Small body bold | 12pts | Bold |
| `.bodyBase` | Base body text | 14pts | Regular |
| `.bodyBaseHeavy` | Base body bold | 14pts | Bold |
| `.bodyLarge` | Large body text | 16pts | Regular |
| `.bodyLargeHeavy` | Large body bold | 16pts | Bold |
| `.bodyXLarge` | Extra large body | 18pts | Regular |
| `.bodyXLargeHeavy` | Extra large bold | 18pts | Bold |

## Heading Typography Tokens

Use these classes for headings:

| Class | Description |
|-------|-------------|
| `.headingXSmall` | Extra small heading |
| `.headingSmall` | Small heading |
| `.headingBase` | Base heading |
| `.headingLarge` | Large heading |
| `.headingEyebrow` | Eyebrow/overline text |

## Display Typography Tokens

Use these for large display text:

| Class |
|-------|
| `.displaySmall` |
| `.displayBase` |
| `.displayLarge` |
| `.displayXLarge` |

## Button Typography Tokens

| Class | Description |
|-------|-------------|
| `.buttonSentenceCase14` | Button text, sentence case, 14px |
| `.buttonUpperCase16` | Button text, uppercase, 16px |

## Usage Examples

### Body Text

```html
<p class="bodyBase">Regular body text</p>
<p class="bodyBaseHeavy">Bold body text</p>
<p class="bodySmall">Small caption text</p>
<p class="bodyLarge">Large body text</p>
```

### Headings

```html
<h1 class="headingLarge">Large Heading</h1>
<h2 class="headingBase">Base Heading</h2>
<h3 class="headingSmall">Small Heading</h3>
<span class="headingEyebrow">Eyebrow Text</span>
```

### Display Text

```html
<span class="displayXLarge">Display XL</span>
<span class="displayLarge">Display Large</span>
<span class="displayBase">Display Base</span>
<span class="displaySmall">Display Small</span>
```

### Buttons

```html
<button class="buttonSentenceCase14">Click Me</button>
<button class="buttonUpperCase16">SUBMIT</button>
```

## CSS Variables

The typography system uses CSS variables for customization:

```css
:root {
  /* Font families */
  --font-family-primary: 'NotoSans', sans-serif;
  --font-family-secondary: 'Soehne', sans-serif;

  /* Font sizes */
  --font-size-xs: ...;
  --font-size-sm: ...;
  --font-size-base: ...;
  --font-size-lg: ...;
  --font-size-xl: ...;

  /* Font weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
}
```

## Best Practices

1. **Use token classes over custom styles**: Prefer `.bodyBase` over custom `font-size: 14pt`
2. **Match weight to semantics**: Use Heavy/Bold variants intentionally
3. **Use proper heading hierarchy**: Don't skip heading levels
4. **Set line-height appropriately**: Body text needs adequate line-height
5. **Consider accessibility**: Use relative units (rem) where possible

## Anti-Patterns

1. **Don't mix font families inconsistently**: Stick to primary fonts
2. **Don't use arbitrary font sizes**: Use token classes
3. **Don't skip heading levels**: Don't use `.headingLarge` for everything
4. **Don't forget mobile sizing**: Smaller screens may need smaller text
5. **Don't ignore line-height**: Ensure readability
