import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const locale = cookies.get('locale');
	const theme = cookies.get('theme');

	return {
		locale: locale === 'et' ? 'et' : 'en',
		theme: theme === 'dark' ? 'dark' : 'light'
	};
};