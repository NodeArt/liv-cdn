<script lang="ts">
	export let data;
</script>

<h1>Users in MGA table</h1>

<!--{JSON.stringify(data)}-->

<table>
	<caption> CC </caption>
	<thead>
		<tr>
			<th scope="col">no</th>
			<th scope="col">timestamp</th>
			<th scope="col">id</th>
		</tr>
	</thead>
	<tbody>
		{#if data?.records}
			{#each data?.records as { timestamp, id }, i}
				<tr>
					<th scope="row">{i + 1}</th>
					<td>{timestamp}</td>
					<td>{id}</td>
				</tr>
			{/each}
		{:else}
			<tr>
				<th scope="row">0</th>
				<td>no</td>
				<td>empty</td>
			</tr>
		{/if}
	</tbody>
	<tfoot>
		<tr>
			<th scope="row" colspan="2">Total:</th>
			<td colspan="1"><b>{data?.totalRows?.toString()}</b></td>
		</tr>
	</tfoot>
</table>

<style>
	table {
		table-layout: fixed;
		width: 100%;
		max-width: 800px;
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
		width: 40%;
	}

	thead th:nth-child(3) {
		width: 40%;
	}

	th,
	td {
		padding: 20px;
	}
</style>
