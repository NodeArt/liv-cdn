import { check as checkBasicAuth } from '$lib/utils/basic-auth';
import type { LayoutServerLoad } from './$types';
import { dev } from '$app/environment';

export const csr = true;
export const ssr = true;
export const prerender = false;
export const load = (async (event) => {
	if (!dev) checkBasicAuth(event);
}) satisfies LayoutServerLoad;
