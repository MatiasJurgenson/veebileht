import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('light');
export const locale = writable<'en' | 'et'>('en');