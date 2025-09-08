// テーマ定義ファイル
export const theme = {
  colors: {
    // Primary Colors - 防災グリーン
    primary: {
      50: '#F1F8E9',
      100: '#E8F5E9',
      200: '#C8E6C9',
      300: '#A5D6A7',
      400: '#81C784',
      500: '#4CAF50', // メインカラー
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
    },
    // Secondary Colors - 信頼ブルー
    secondary: {
      50: '#E8F5FD',
      100: '#E3F2FD',
      200: '#BBDEFB',
      300: '#90CAF9',
      400: '#64B5F6',
      500: '#2196F3', // メインカラー
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    // Neutral Colors
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    // Semantic Colors
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    success: '#4CAF50',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
} as const;

export type Theme = typeof theme;