import { getAuthToken } from './jwt';

const PROJECT_ID = 'catalogue-classifier';

type Options = {
	row: Record<string, unknown>;
	dataset: string;
	table: string;
};

type ListOptions = {
	startIndex?: string; // Start row index of the table.
	maxResults?: number; // Row limit of the table
	pageToken?: string; // To retrieve the next page of table data,
	// set this field to the string provided in the pageToken field
	// of the response body from your previous call to tabledata.list
	selectedFields?: string; // Subset of fields to return, supports
	// select into sub fields. Example: selectedFields = "a,e.d.f";
	formatOptions?: unknown; // Output timestamp field value in usec int64
	// instead of double. Output format adjustments.
};

export async function insertIntoBigquery({ row, dataset, table }: Options): Promise<void> {
	const url = `https://www.googleapis.com/bigquery/v2/projects/${PROJECT_ID}/datasets/${dataset}/tables/${table}/insertAll`;

	const scopes = ['https://www.googleapis.com/auth/bigquery'];

	const ACCESS_TOKEN = await getAuthToken(scopes);

	const requestBody = {
		rows: [
			{
				json: row
			}
		]
	};
	const requestHeaders = {
		Authorization: `Bearer ${ACCESS_TOKEN.accessToken}`,
		'Content-Type': 'application/json'
	};
	const requestOptions = {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(requestBody)
	};

	try {
		const response = await fetch(url, requestOptions);
		const responseText = await response.text();

		if (!response.ok) {
			throw Error(
				`Error inserting row into BigQuery table: ${response.status} ${response.statusText} ${responseText}`
			);
		}

		console.log(`Inserted row(s) into BigQuery table ${dataset}.${table}`, responseText);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown BQ error';
		console.error(`Error inserting row into BigQuery table: ${message}, ${JSON.stringify(e)}`);
		throw Error(`Error inserting row into BigQuery table: ${message}`);
	}
}

export async function listTableDataBigquery(
	{ dataset, table }: Options,
	{ formatOptions, selectedFields, startIndex, maxResults, pageToken }: ListOptions = {}
): Promise<unknown> {
	const url = `https://www.googleapis.com/bigquery/v2/projects/${PROJECT_ID}/datasets/${dataset}/tables/${table}/data`;

	const scopes = ['https://www.googleapis.com/auth/bigquery'];

	const ACCESS_TOKEN = await getAuthToken(scopes);

	const requestHeaders = {
		Authorization: `Bearer ${ACCESS_TOKEN.accessToken}`,
		'Content-Type': 'application/json'
	};
	const requestOptions = {
		headers: requestHeaders
	};

	let apiUrl = new URL(url);
	if (maxResults) apiUrl.searchParams.append('maxResults', maxResults.toString());
	if (formatOptions) apiUrl.searchParams.append('pageToken', formatOptions);
	if (selectedFields) apiUrl.searchParams.append('selectedFields', selectedFields);
	if (startIndex) apiUrl.searchParams.append('startIndex', startIndex);
	if (pageToken) apiUrl.searchParams.append('pageToken', pageToken);

	try {
		const response = await fetch(apiUrl, requestOptions);
		const responseText = await response.text();

		if (!response.ok) {
			throw Error(
				`Error reading rows from BigQuery table: ${response.status} ${response.statusText} ${responseText}`
			);
		}
		return JSON.parse(responseText);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown BQ error';
		console.error(`Error reading rows from BigQuery table: ${message}, ${JSON.stringify(e)}`);
		throw Error(`Error reading rows from BigQuery table: ${message}`);
	}
}

export async function runJob({ dataset, table }): Promise<void> {
	const url = `https://www.googleapis.com/bigquery/v2/projects/${PROJECT_ID}/jobs`;

	const scopes = ['https://www.googleapis.com/auth/bigquery'];

	const ACCESS_TOKEN = await getAuthToken(scopes);

	const requestBody = {
		configuration: {
			query: {
				useLegacySql: false,
				query: `SELECT * FROM ${dataset}.processingQuery`,
				destinationTable: {
					datasetId: dataset,
					projectId: PROJECT_ID,
					tableId: table
				},
				createDisposition: 'CREATE_IF_NEEDED',
				writeDisposition: 'WRITE_TRUNCATE'
			}
		}
	};
	const requestHeaders = {
		Authorization: `Bearer ${ACCESS_TOKEN.accessToken}`,
		'Content-Type': 'application/json'
	};
	const requestOptions = {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(requestBody)
	};

	try {
		const response = await fetch(url, requestOptions);
		const responseText = await response.text();

		if (!response.ok) {
			throw Error(
				`Error inserting row into BigQuery table: ${response.status} ${response.statusText} ${responseText}`
			);
		}
		console.log('job:', responseText);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown BQ error';
		console.error(`Error inserting row into BigQuery table: ${message}, ${JSON.stringify(e)}`);
		throw Error(`Error inserting row into BigQuery table: ${message}`);
	}
}

export async function runQuery(
	query: string,
	{ formatOptions, selectedFields, startIndex, maxResults, pageToken }: ListOptions = {}
): Promise<void> {
	const url = `https://www.googleapis.com/bigquery/v2/projects/${PROJECT_ID}/queries`;

	const scopes = ['https://www.googleapis.com/auth/bigquery'];

	const ACCESS_TOKEN = await getAuthToken(scopes);

	const requestBody = {
		useLegacySql: false,
		query,
		maxResults: maxResults,
		timeoutMs: 100000,
		useQueryCache: true
	};
	const requestHeaders = {
		Authorization: `Bearer ${ACCESS_TOKEN.accessToken}`,
		'Content-Type': 'application/json'
	};
	const requestOptions = {
		method: 'POST',
		headers: requestHeaders,
		body: JSON.stringify(requestBody)
	};

	try {
		const response = await fetch(url, requestOptions);
		const responseText = await response.text();

		if (!response.ok) {
			throw Error(
				`Error inserting row into BigQuery table: ${response.status} ${response.statusText} ${responseText}`
			);
		}
		return JSON.parse(responseText);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown BQ error';
		console.error(`Error inserting row into BigQuery table: ${message}, ${JSON.stringify(e)}`);
		throw Error(`Error inserting row into BigQuery table: ${message}`);
	}
}
