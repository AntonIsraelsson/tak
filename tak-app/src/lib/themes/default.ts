// $lib/themes/default.ts
import type { Theme } from './types';

export const defaultTheme: Theme = {
  name: 'default',
  board: {
    background: '#607D8B',
    gridGap: 1,
    borderRadius: 0,
    shadow: 'none'
  },
  cell: {
    background: '#90A4AE',
    backgroundAlt: '#8A9FAA', // for checkered pattern
    border: 'none',
    borderRadius: 0,
    hoverBackground: '#9EAFB3',
    highlightBackground: '#8CBB63' // for last move
  },
  pieces: {
    white: {
      background: '#ECEFF1',
      border: '1px solid #CFD8DC'
    },
    black: {
      background: '#546E7A',
      border: '1px solid #37474F'
    },
    borderRadius: {
      flat: 2,
      standing: 2,
      capstone: 50
    },
    shadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  },
  labels: {
    color: '#37474F',
    fontSize: 14
  }
};