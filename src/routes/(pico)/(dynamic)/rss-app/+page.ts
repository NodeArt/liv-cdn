import { error } from '@sveltejs/kit';
import type { PageLoad, PageServerData } from './$types';
type OutputProps = any;

export const load: PageLoad<OutputProps> = async ({ fetch }) => {
	const res = await fetch('/api/rss-app');
	const data = await res.json();

	return { data };
};
