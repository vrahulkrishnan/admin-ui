import { MantineThemeOverride } from '@mantine/core';

export const styles: MantineThemeOverride['components'] = {
  Checkbox: {
    styles: theme => ({
      input: { borderColor: theme.colors.primary[5], cursor: 'pointer' },
      label: { color: '#7b7b7b', fontWeight: theme.other.fontWeight[2] }
    })
  },
  TextInput: {
    styles: {
      input: { boxShadow: '7px 11px 18px 0px rgba(182, 194, 194, 0.2)', borderColor: 'transparent', fontSize: 14 }
    }
  },
  Select: {
    styles: {
      input: { boxShadow: '7px 11px 18px 0px rgba(182, 194, 194, 0.2)', borderColor: 'transparent', fontSize: 14 }
    }
  },
  Textarea: {
    styles: {
      input: { boxShadow: '7px 11px 18px 0px rgba(182, 194, 194, 0.2)', borderColor: 'transparent', fontSize: 14 }
    }
  },
  PasswordInput: {
    styles: {
      input: { boxShadow: '7px 11px 18px 0px rgba(182, 194, 194, 0.2)', borderColor: 'transparent' },
      innerInput: { fontSize: 14 }
    }
  },
  Button: {
    styles: theme => ({
      root: {
        fontSize: 14,
        transition: 'background-color 0.3s',
        ':hover': {
          backgroundColor: theme.colors.secondary[5]
        }
      }
    })
  },
  Notification: {
    styles: theme =>
      ({
        root: {
          padding: '0.875rem 1.25rem',
          alignItems: 'start',
          borderRadius: '0.5rem',
          color: theme.colors.dark[6],
          position: 'fixed',
          right: '10px',
          top: '10px',
          zIndex: 101,
          minWidth: '350px',
          '&:before': {
            top: 3,
            bottom: 3,
            left: 6
          }
        },
        description: { color: theme.colors.dark[6] },
        closeButton: {
          color: theme.white,
          borderRadius: '50%',
          fontSize: '0.5rem',
          '&:hover': {
            color: theme.white
          },
          width: '1.25rem',
          height: '1.25rem',
          minWidth: '1.25rem',
          minHeight: '1.25rem',
          '& svg': { width: '0.875rem', height: '0.875rem' }
        }
      } as any)
  },
  Modal: {
    styles: theme => ({
      header: {
        color: theme.colors.primary[5],
        fontWeight: 500,
        fontSize: theme.fontSizes.lg
      },
      close: {
        position: 'absolute',
        top: -10,
        right: 0,
        background: theme.colors.primary[5],
        color: theme.white,
        '&:hover': {
          background: theme.colors.primary[7]
        }
      }
    })
  }
};
