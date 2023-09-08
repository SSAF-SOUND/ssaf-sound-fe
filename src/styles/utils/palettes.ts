export const palettes = {
  primary: {
    default: '#98CEFF', // FIGMA (default)
    light: '#D0E5FF', // FIGMA (sub)
    dark: '#61A3F3', // FIGMA (point)
    darken: '#0C74F4', // FIGMA (strong)
    darkest: '#0C1B2E', // FIGMA (dark)
  },
  secondary: {
    default: '#FFA4A4',
    light: '#FFDEDE',
    dark: '#FF7575',
    darken: '#FF1E1E',
    darkest: '#6F1818',
  },
  grey: {
    default: '#8890A8',
    light: '#EBEBEB', // 임의로 넣은 값
    dark: '#5B647C',
    darken: '#303F6B',
  },
  recruit: {
    default: '#86FFF8',
    light: '#D0FEFB',
    dark: '#1CD2C8',
  },
  success: {
    default: '#43E26B',
    light: '#DDFFE6',
    dark: '#028E25',
  },
  warning: {
    default: '#FFBF69',
    light: '#FFE0B2',
    dark: '#FF9911',
  },
  error: {
    default: '#FF5C5C',
    light: '#FFD1CF',
    dark: '#C60B00',
  },
  point: {
    orange: '#FFDF99',
    green: '#C6FD8C',
    purple: '#E7B9FF',
    darkPurple: '#CC6EFE',
  },
  //
  major: '#71E498',
  nonMajor: '#FFBF75',
  majorDark: '#3B564E',
  nonMajorDark: '#584E47',
  //
  background: {
    default: '#2E323B',
    grey: '#3D4353',
  },
  //
  font: {
    default: '#FFFFFF',
    grey: '#292929',
    lightGrey: '#EBEBEB',
    blueGrey: '#8890A8',
  },
  //
  black: '#000000',
  grey0: '#292929',
  grey1: '#3F3F3F',
  grey2: '#777777',
  grey3: '#BCBCBC',
  grey4: '#EBEBEB',
  grey5: '#F8F7F7',
  white: '#FFFFFF',
  white2: '#F5F5F5',
} as const;
