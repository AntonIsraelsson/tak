// $lib/themes/default.ts
import type { Theme } from './types';

export const defaultTheme: Theme = {
  name: 'default',
  board: {
    background: '#9fb3b3',
    gridGap: 3,
    borderRadius: 12,
    shadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  cell: {
    background: '#b8c7c7',
    border: 'none',
    borderRadius: 8,
    hoverBackground: '#c4d1d1'
  },
  pieces: {
    white: {
      background: '#f8f9fa',
      border: '1px solid #dee2e6'
    },
    black: {
      background: '#546e7a',
      border: '1px solid #37474f'
    },
    borderRadius: {
      flat: 6,
      standing: 6,
      capstone: 50
    },
    shadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  labels: {
    color: '#4a5568',
    fontSize: 14
  }
};