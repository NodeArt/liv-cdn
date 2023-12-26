import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parseRSS } from './parser';
import { html2Markdown } from '@inkdropapp/html2markdown';

export const GET = (async ({ fetch }) => {
	const feed = await parseRSS(
		'https://rss.app/feeds/_70ZjRg3vZPhJKVIY.xml',
		fetch
	);
	const result = feed.items.map((item) => {
		return {
			id: item.id,
			title: html2Markdown(item.title),
			description: item.description,
			author: item.author,
			link: item.link,
			published: item.published,
			created: item.created,
			category: item.category,
			content: html2Markdown(item.content ?? item.fullText, {})
			// content_encoded: html2Markdown(item.content_encoded)
		};
	});
	return new Response(JSON.stringify(result), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': `s-maxage=3000`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	});
}) satisfies RequestHandler;
