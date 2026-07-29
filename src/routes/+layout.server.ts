//  the server reads that cookie

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const locale = cookies.get('locale');

	return {
		locale: locale === 'et' ? 'et' : 'en'
	};
};