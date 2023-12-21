import { error } from '@sveltejs/kit';
import { listTableDataBigquery } from '$lib/utils/bigquery';

export async function load() {
	let data;
	try {
		data = await listTableDataBigquery(
			{ dataset: 'ccapp', table: 'processingQuery' },
			{ maxResults: 1000 }
		);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown BQ error';
		return error(500, message);
	}
	let totalRows = data.totalRows;
	let pageToken = data.pageToken;
	let records = data.rows.map((row) => {
		return { timestamp: row.f[0].v, id: row.f[1].v };
	});
	return { totalRows, records, data };
}
