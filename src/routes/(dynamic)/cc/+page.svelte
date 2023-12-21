<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	const send = async function (event) {
		console.log(event.target);
	};
</script>

<h1>Users in MGA table</h1>

<!--{JSON.stringify(data)}-->

<table>
	<caption> CC </caption>
	<thead>
		<tr>
			<th scope="col">no</th>
			<th scope="col" class="hidden">uid</th>
			<th scope="col">code</th>
			<th scope="col">name</th>
			<th scope="col">match</th>
			<th scope="col">action</th>
			<th scope="col">submit</th>
		</tr>
	</thead>
	<tbody>
		{#if data?.records}
			{#each data?.records as rec, i (rec.uid)}
				<tr>
					<th scope="row">{i + 1}</th>
					<td class="truncate hidden">{rec.uid}</td>
					<td>{rec.code}</td>
					<td>{rec.name}</td>
					<td>{rec.match}</td>
					<td><input type="checkbox" bind:checked={rec.answer} /></td>
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
							<input type="hidden" value={rec.answer} name="answer" />
							<input type="submit" value="Ok" />
						</form>
					</td>
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
		width: 5%;
	}

	thead th:nth-child(2) {
		width: 10%;
	}

	thead th:nth-child(3) {
		width: 20%;
	}
	thead th:nth-child(4) {
		width: 30%;
	}
	thead th:nth-child(5) {
		width: 30%;
	}
	thead th:nth-child(6) {
		width: 5%;
	}
	thead th:nth-child(7) {
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
