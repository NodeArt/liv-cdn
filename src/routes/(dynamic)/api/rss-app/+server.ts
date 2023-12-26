import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parseRSS } from './parser';
import { html2Markdown } from '@inkdropapp/html2markdown';

export const GET = (async ({ fetch }) => {
	const feed = await parseRSS(
		'https://rss.app/feeds/_70ZjRg3vZPhJKVIY.xml',
		fetch
	);
	feed.items=feed?.items.slice(0,5)

	const api = feed?.items.map(item=>{
		return  fetch(`https://api.worldnewsapi.com/extract-news?url=${item.link}&analyze=true&api-key=b3d4fe7ba6e14c6c8c7b29bf52b87605`).then(data=>data.json());
	})
	const xdata= await Promise.all(api);
	console.log(xdata);
	const result = feed.items.map((item, index) => {
		return {
			id: item.id,
			title: html2Markdown(item.title),
			description: item.description,
			author: item.author,
			link: item.link,
			published: item.published,
			created: item.created,
			category: item.category,
			content: html2Markdown(xdata[index].text , {})
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
