// $lib/themes/index.ts
import { defaultTheme } from './default';
import type { Theme } from './types';

export const themes: Record<string, Theme> = {
  default: defaultTheme
};

export const getTheme = (name: string = 'default'): Theme => {
  return themes[name] || themes.default;
};

export type { Theme };