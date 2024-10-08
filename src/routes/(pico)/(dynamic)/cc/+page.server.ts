import { error, fail } from '@sveltejs/kit';
import { insertIntoBigquery, runQuery } from '$lib/utils/bigquery';
export async function load() {
	let dataQuery;
	let countQuery;
	try {
		dataQuery = await runQuery(`SELECT * FROM ccapp.processingQuery`, { maxResults: 100 });
		countQuery = await runQuery(`SELECT count(*) FROM ccapp.processingQuery`, { maxResults: 1 });
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown BQ error';
		return error(500, message);
	}
	const processingQuerySize = countQuery?.rows[0]?.f[0]?.v ?? 0;
	// let totalRows = data.totalRows;
	// let pageToken = data.pageToken;
	const records = dataQuery.rows.map((row) => {
		return { uid: row.f[0].v, code: row.f[2].v, name: row.f[1].v, match: row.f[3].v };
	});
	return { records, processingQuerySize };
}

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid')?.toString();
		if (!uid) return fail(400, { error: 'uid', message: 'missing uid' });
		const answer = data.get('answer')?.toString();
		if (!answer) return fail(400, { error: 'answer', message: 'missing answer' });

		const bqObject = {
			addingTime: Math.floor(Date.now() / 1000),
			uid,
			answer: Number(answer) || -1
		};

		try {
			await insertIntoBigquery({ row: bqObject, dataset: 'ccapp', table: 'answers' });
		} catch (e) {
			const message = e instanceof Error ? e.message : 'unknown BQ error';
			return fail(500, { error: 'bq', message });
		}
		return { success: true, uid };
	}
};
