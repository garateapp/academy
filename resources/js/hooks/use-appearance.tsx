import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light';
export type Appearance = ResolvedAppearance;

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light';

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') return 'light';

    return (localStorage.getItem('appearance') as Appearance) || 'light';
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') return;

    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    document.documentElement.setAttribute('data-theme', 'greenex');
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeTheme(): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');

    currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);
}

export function useAppearance() {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'light',
    );

    const resolvedAppearance: ResolvedAppearance = useMemo(
        () => 'light',
        [],
    );

    const updateAppearance = useCallback((): void => {
        currentAppearance = 'light';

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', 'light');

        // Store in cookie for SSR...
        setCookie('appearance', 'light');

        applyTheme('light');
        notify();
    }, []);

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
