<script lang="ts">
	import { tick } from 'svelte';

	export let data;
	import { enhance } from '$app/forms';
	let loading = 0;
</script>

<h1>CC to clarify</h1>

<!--{JSON.stringify(data)}-->

<table role="grid">
	<caption aria-busy={loading > 0}>CC</caption>
	<thead>
		<tr>
			<th scope="col">no</th>
			<th scope="col">good</th>
			<th scope="col">bad</th>
			<th scope="col">wtf</th>
			<th scope="col" class="hidden">uid</th>
			<th scope="col">рро</th>
			<th scope="col">ерпн (match)</th>
			<th scope="col">код</th>
		</tr>
	</thead>
	<tbody>
		{#if data?.records}
			{#each data?.records as rec, i (rec.uid)}
				<tr class:divider={data.records[i].code !== data.records[i + 1]?.code}>
					<th scope="row">{i + 1}</th>
					<td>
						<form
							use:enhance={() => {
								loading++;
								return async ({ result }) => {
									if (result?.data?.uid === data.records[i].uid) {
										data.records.splice(i, 1);
										data.records = [...data.records];
									}
									await tick();
									loading--;
								};
							}}
							method="post"
							action="?/add"
						>
							<input type="hidden" value={rec.uid} name="uid" />
							<input type="hidden" value="1" name="answer" />
							<input disabled={loading > 0} type="submit" class="contrast" value="не верно" />
						</form>
					</td>
					<td>
						<form
							use:enhance={() => {
								loading++;
								return async ({ result }) => {
									if (result?.data?.uid === data.records[i].uid) {
										data.records.splice(i, 1);
										data.records = [...data.records];
									}
									await tick();
									loading--;
								};
							}}
							method="post"
							action="?/add"
						>
							<input type="hidden" value={rec.uid} name="uid" />
							<input type="hidden" value="2" name="answer" />
							<input disabled={loading > 0} type="submit" value="верно" />
						</form>
					</td>
					<td>
						<form
							use:enhance={() => {
								loading++;
								return async ({ result }) => {
									if (result?.data?.uid === data.records[i].uid) {
										data.records.splice(i, 1);
										data.records = [...data.records];
									}
									await tick();
									loading--;
								};
							}}
							method="post"
							action="?/add"
						>
							<input type="hidden" value={rec.uid} name="uid" />
							<input type="hidden" value="3" name="answer" />
							<input disabled={loading > 0} type="submit" value="?" />
						</form>
					</td>
					<td class="truncate hidden">{rec.uid}</td>
					<td>{rec.name}</td>
					<td>{rec.match}</td>
					<td
						><a target="_blanc" href="https://qdpro.com.ua/uk/uktzed_search/{rec.code}"
							>{rec.code}</a
						></td
					>
				</tr>
			{/each}
		{:else}
			<tr>
				<th scope="row">0</th>
				<td colspan="5"
					>-- no data from <a
						href="https://console.cloud.google.com/bigquery?project=catalogue-classifier">BQ</a
					> --</td
				>
			</tr>
		{/if}
	</tbody>
	<tfoot>
		<tr>
			<th scope="row" colspan="2">Total:</th>
			<td colspan="1"><b>{data?.records?.length ?? 0}</b></td>
		</tr>
	</tfoot>
</table>

<style>
	table {
		table-layout: fixed;
		width: 100%;
		max-width: 1400px;
		border-collapse: collapse;
		border: 3px solid black;
	}

	tr {
		border: 1px solid;
	}

	.divider {
		border-bottom-color: red;
		border-bottom-style: double;
	}

	thead th:nth-child(1) {
		width: 8%;
	}

	thead th:nth-child(2) {
		width: 15%;
	}

	thead th:nth-child(3) {
		width: 15%;
	}

	thead th:nth-child(4) {
		width: 9%;
	}

	thead th:nth-child(5) {
		width: 13%;
	}

	thead th:nth-child(6) {
		width: 25%;
	}

	thead th:nth-child(7) {
		width: 25%;
	}
	thead th:nth-child(8) {
		width: 10%;
	}

	.truncate {
		width: 250px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.hidden {
		display: none;
	}

	th,
	td {
		padding: 20px;
	}
</style>
