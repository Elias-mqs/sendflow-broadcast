import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    divider: '#E2E8F0',
    error: { main: '#EF4444' },
    success: { main: '#10B981' },
    warning: { main: '#F59E0B' },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 500 },
    body2: { lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: 0,
          boxShadow: 'none',
          transition: 'all 0.15s ease',
          '&:hover': { boxShadow: 'none' },
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2), 0 2px 8px rgba(37, 99, 235, 0.15)',
            '&:hover': {
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
              transform: 'translateY(-1px)',
            },
            '&:active': { transform: 'translateY(0)' },
            '&.Mui-disabled': {
              background: '#CBD5E1',
              color: '#94A3B8',
              boxShadow: 'none',
            },
          },
        },
        text: {
          '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.06)' },
        },
        outlined: {
          borderColor: '#E2E8F0',
          '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FAFAFA',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: '#F8FAFC',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#94A3B8' },
          },
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2563EB',
              borderWidth: 2,
            },
          },
        },
        notchedOutline: {
          borderColor: '#E2E8F0',
          transition: 'border-color 0.15s ease',
        },
        input: {
          paddingTop: 13,
          paddingBottom: 13,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#64748B',
          fontSize: 14,
          '&.Mui-focused': { color: '#2563EB' },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 4, fontSize: 12 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        },
        elevation0: { boxShadow: 'none' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: 14,
          '&.MuiAlert-standardError': {
            backgroundColor: '#FEF2F2',
            color: '#B91C1C',
            border: '1px solid #FECACA',
            '& .MuiAlert-icon': { color: '#EF4444' },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            color: '#2563EB',
            '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.12)' },
            '& .MuiListItemIcon-root': { color: '#2563EB' },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#E2E8F0' },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: { borderRadius: 10 },
      },
    },
  },
})
