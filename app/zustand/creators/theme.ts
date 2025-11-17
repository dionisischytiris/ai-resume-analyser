import type {PuterStore} from "../types";

export const createThemeSlice = (
    set: (partial: Partial<PuterStore>) => void,
    get: () => PuterStore
) => {
    // Core setter that updates both state and the DOM attribute
    const setTheme = (theme: 'light' | 'dark') => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
        }
        set({theme});
    };

    // Initialize based on system preference
    const initTheme = () => {
        if (typeof window === 'undefined') return;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    };

    // Run initialization once on client
    if (typeof window !== 'undefined') {
        initTheme();
    }

    return {
        theme: 'light' as 'light' | 'dark', // ✅ force literal type
        setTheme,
        toggleTheme: () => {
            const next: 'light' | 'dark' = get().theme === 'light' ? 'dark' : 'light';
            setTheme(next);
        },
        initTheme,
    };
};
