export type ThemeMode = 'light' | 'dark' | 'system';
export declare function readThemeMode(): ThemeMode;
export declare function isDarkMode(mode: ThemeMode): boolean;
export declare function applyThemeMode(mode: ThemeMode): void;
export declare function watchSystemTheme(onChange: () => void): () => void;
