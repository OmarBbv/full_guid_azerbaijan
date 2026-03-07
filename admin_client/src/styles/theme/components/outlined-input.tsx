import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiOutlinedInput = {
  styleOverrides: {
    root: {
      '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--mui-palette-divider)',
      },
    },
  },
} satisfies Components<Theme>['MuiOutlinedInput'];
