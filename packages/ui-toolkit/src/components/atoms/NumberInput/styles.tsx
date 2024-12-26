import { styled } from '@stitches/react';


export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  background: 'var(--background-accent-subtle)',
  width: 'fit-content',
  height: '30px',
  color: 'var(--content-accent)',
  borderRadius: '2px',
  padding: '0px 5px',
  variants: {
    variant: {
      warning: {
        background: 'var(--background-warning-subtle)',
        color: 'var(--content-warning)'
      },
      error: {
        background: 'var(--background-negative-subtle)',
        color: 'var(--content-negative)'
      },
      disabled: {
        background: 'var(--background-secondary)',
        color: 'var(--content-primary)'
      },
      unstyled: {
        background: 'transparent',
        color: 'var(--content-primary)',
        border: 'none'
      },
      default: {
        background: 'var(--background-accent-subtle)',
        color: 'var(--content-accent)'
      }
    }
  }
}
);

export const Input = styled('input', {
  border: 'none',
  height: '30px',
  width: '82px',
  color: 'inherit',
  background: 'transparent',
  textAlign: 'right',
  flexGrow: 1,
  outline: 0,
  opacity: 1,
  caretColor: 'var(--content-accent)',
  WebkitTextFillColor: 'var(--content-accent)',
  padding: 0,
  variants: {
    variant: {
      warning: {
        caretColor: 'var(--content-warning)',
        WebkitTextFillColor: 'var(--content-warning)'
      },
      error: {
        caretColor: 'var(--content-negative)',
        WebkitTextFillColor: 'var(--content-negative)'
      },
      disabled: {
        pointerEvents: 'none',
        caretColor: 'var(--content-primary)',
        WebkitTextFillColor: 'var(--content-primary)'
      },
      unstyled: {
        caretColor: 'var(--content-primary)',
        WebkitTextFillColor: 'var(--content-primary)'
      },
      default: {
        caretColor: 'var(--content-accent)',
        WebkitTextFillColor: 'var(--content-accent)'
      }
    },
    showSteper: {
      true: {
        textAlign: 'center',
        width: '60px'
      }
    }
  },
  '&::placeholder': {
    color: 'var(--content-secondary)',
    WebkitTextFillColor: 'var(--content-secondary)'
  }
});
