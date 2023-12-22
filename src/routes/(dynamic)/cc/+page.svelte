<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';

	const send = async function (event) {
		console.log(event.target);
	};
</script>

<h1>CC to clarify</h1>

<!--{JSON.stringify(data)}-->
<form on:submit={send} use:enhance method="post" action="?/update">
	<input type="submit" value="recreate processing query" />
</form>

<table role="grid">
	<caption> CC</caption>
	<thead>
		<tr>
			<th scope="col">no</th>
			<th scope="col">good</th>
			<th scope="col">bad</th>
			<th scope="col" class="hidden">uid</th>
			<th scope="col">рро</th>
			<th scope="col">ерпн (match)</th>
			<th scope="col">код</th>
		</tr>
	</thead>
	<tbody>
		{#if data?.records}
			{#each data?.records as rec, i (rec.uid)}
				<tr>
					<th scope="row">{i + 1}</th>
					<td>
						<form
							on:submit={send}
							use:enhance={({ formElement, formData, action, cancel, submitter }) => {
								return async ({ result, update }) => {
									if (result?.data?.uid === data.records[i].uid) {
										data.records.splice(i, 1);
										data.records = [...data.records];
									}
									// update();
									// `result` is an `ActionResult` object
									// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
								};
							}}
							method="post"
							action="?/add"
						>
							<input type="hidden" value={rec.uid} name="uid" />
							<input type="hidden" value="0" name="answer" />
							<input type="submit" class="contrast" value="не верно" />
						</form>
					</td>
					<td>
						<form
							on:submit={send}
							use:enhance={({ formElement, formData, action, cancel, submitter }) => {
								return async ({ result, update }) => {
									if (result?.data?.uid === data.records[i].uid) {
										data.records.splice(i, 1);
										data.records = [...data.records];
									}
									// update();
									// `result` is an `ActionResult` object
									// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
								};
							}}
							method="post"
							action="?/add"
						>
							<input type="hidden" value={rec.uid} name="uid" />
							<input type="hidden" value="1" name="answer" />
							<input type="submit" value="верно" />
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
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
			</tr>
		{/if}
	</tbody>
	<tfoot>
		<tr>
			<th scope="row" colspan="2">Total:</th>
			<td colspan="1"><b>{data?.records?.length}</b></td>
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

	thead th:nth-child(1) {
		width: 10%;
	}

	thead th:nth-child(2) {
		width: 15%;
	}

	thead th:nth-child(3) {
		width: 15%;
	}

	thead th:nth-child(4) {
		width: 13%;
	}

	thead th:nth-child(5) {
		width: 25%;
	}

	thead th:nth-child(6) {
		width: 30%;
	}

	thead th:nth-child(7) {
		width: 30%;
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
