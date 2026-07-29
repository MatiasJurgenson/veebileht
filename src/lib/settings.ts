import { writable } from 'svelte/store';

function persistedWritable<T>(key: string, initialValue: T) {
    // Check if we are in a browser environment
	const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
	let initial: T = initialValue;

	if (isBrowser) {
		try {
            // Attempt to retrieve the stored value from localStorage
			const stored = localStorage.getItem(key);
			if (stored !== null) {
				initial = JSON.parse(stored) as T;
			}
		} catch {
			initial = initialValue;
		}
	}

	const store = writable<T>(initial);

	if (isBrowser) {
		store.subscribe((value) => {
			try {
                // Store the updated value in localStorage whenever it changes
				localStorage.setItem(key, JSON.stringify(value));
				if (key === 'locale') {
					document.cookie = `locale=${String(value)}; path=/; max-age=31536000; samesite=lax`;
				}
			} catch {
				// ignore storage write errors
			}
		});
	}

	return store;
}

export const theme = persistedWritable<'light' | 'dark'>('theme', 'light');
export const locale = persistedWritable<'en' | 'et'>('locale', 'en');