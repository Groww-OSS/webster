---
name: groww-carousel
description: Carousel component for image/content sliders with navigation controls. Use for image galleries, hero sections, or content that scrolls horizontally.
---

# Groww Carousel Components

## Import Patterns

```typescript
import Carousel from '@groww-tech/ui-toolkit/dist/esm/components/molecules/Carousel';
import FlatCarousel from '@groww-tech/ui-toolkit/dist/esm/components/molecules/FlatCarousel';
// or
import { Carousel, FlatCarousel } from '@groww-tech/ui-toolkit';
```

## Key APIs

### Props (Carousel)

```typescript
interface CarouselProps {
  children?: React.ReactNode;              // Slide content
  dots?: boolean;                          // Show navigation dots
  arrows?: boolean;                        // Show arrow buttons
  infinite?: boolean;                      // Infinite loop
  autoplay?: boolean;                      // Auto-play slides
  autoplaySpeed?: number;                  // Auto-play interval (ms)
  speed?: number;                          // Animation speed (ms)
  slidesToShow?: number;                   // Visible slides
  slidesToScroll?: number;                 // Slides per scroll
  centerMode?: boolean;                    // Center current slide
  responsive?: Array<{                     // Responsive breakpoints
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }>;
  className?: string;
  dataTestId?: string;
}
```

### Props (FlatCarousel)

```typescript
interface FlatCarouselImage {
  src: string;                             // Image URL (required)
  darkSrc?: string;                        // Dark mode image URL
  alt: string;                             // Alt text (required)
  width?: number | string;
  height?: number | string;
  title?: string;                         // Image title
  description?: string;                   // Image description
  titleClass?: string;
  descriptionClass?: string;
}

interface FlatCarouselProps {
  images: FlatCarouselImage[];            // Array of images (required)
  parentClass?: string;
  descriptionClass?: string;
  titleClass?: string;
  custom?: boolean;                       // Custom styling
  dataTestId?: string;
}
```

## Usage Examples

### Basic Carousel
```tsx
<Carousel arrows={true} dots={true}>
  <div><img src="/slide1.jpg" alt="Slide 1" /></div>
  <div><img src="/slide2.jpg" alt="Slide 2" /></div>
  <div><img src="/slide3.jpg" alt="Slide 3" /></div>
</Carousel>
```

### With Auto-play
```tsx
<Carousel
  autoplay={true}
  autoplaySpeed={5000}
  arrows={false}
  dots={true}
>
  {slides.map(slide => (
    <div key={slide.id}>{slide.content}</div>
  ))}
</Carousel>
```

### Multiple Visible Slides
```tsx
<Carousel
  slidesToShow={3}
  slidesToScroll={1}
  infinite={true}
>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</Carousel>
```

### Responsive Carousel
```tsx
<Carousel
  slidesToShow={1}
  responsive={[
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ]}
>
  {items.map(item => <Item key={item.id} {...item} />)}
</Carousel>
```

### FlatCarousel for Images
```tsx
const images = [
  {
    src: '/hero1.jpg',
    darkSrc: '/hero1-dark.jpg',
    alt: 'Banner 1',
    title: 'Summer Sale',
    description: 'Up to 50% off',
  },
  {
    src: '/hero2.jpg',
    darkSrc: '/hero2-dark.jpg',
    alt: 'Banner 2',
    title: 'New Arrivals',
    description: 'Check out the latest',
  },
];

<FlatCarousel images={images} />
```

## Anti-Patterns

1. **Don't forget alt text**: Always provide alt for accessibility
2. **Don't disable arrows without dots**: Ensure navigation is possible
3. **Don't set autoplaySpeed too fast**: Users need time to see content
4. **Don't use for complex interactive content**: Consider tabs or separate pages
5. **Don't forget lazy loading for images**: Improves performance

## Accessibility

- Keyboard navigation (Arrow keys)
- Focus indicators on interactive elements
- Screen reader announcements for slide changes
- Proper alt text for images
- Pause autoplay on hover/focus
