// $lib/themes/types.ts
export interface Theme {
  name: string;
  board: {
    background: string;
    gridGap: number;
    borderRadius: number;
    shadow: string;
  };
  cell: {
    background: string;
    backgroundAlt: string;
    border: string;
    borderRadius: number;
    hoverBackground: string;
    highlightBackground: string;
  };
  pieces: {
    white: {
      background: string;
      border: string;
    };
    black: {
      background: string;
      border: string;
    };
    borderRadius: {
      flat: number;
      standing: number;
      capstone: number;
    };
    shadow: string;
  };
  labels: {
    color: string;
    fontSize: number;
  };
}