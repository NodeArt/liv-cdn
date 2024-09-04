<script lang="ts">
	// produces crash point from 100 to 600
	function getCrashPoint() {
		return 100 + Math.floor(Math.random() * 500);
	}

	function getSalt() {
		return (Math.random() + 1).toString(36).substring(7);
	}

	function sha256(str: string) {
		const utf8 = new TextEncoder().encode(str);
		return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
			const hashArray = Array.from(new Uint8Array(hashBuffer));
			return hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
		});
	}

	let rounds = [
		{
			prev: 0,
			current: getCrashPoint(),
			salt: getSalt()
		}
	];

	function newRound() {
		rounds = [
			...rounds,
			{ current: getCrashPoint(), salt: getSalt(), prev: rounds[rounds.length - 1].current }
		];
	}

	let prev, salt, current: string;
</script>

<div class="overflow-auto">
	<table class="striped">
		<thead>
			<tr>
				<th scope="col">prev</th>
				<th scope="col">hash (sha256)</th>
				<th scope="col">salt</th>
				<th scope="col">current crashpoint</th>
			</tr>
		</thead>
		<tbody>
			{#each rounds as round, i (round.salt)}
				<tr>
					{#await sha256(round.salt + round.prev + round.current)}
						<td colspan="4">calculating</td>
					{:then hash}
						<td>{round.prev}</td>
						<td>
							{hash}
						</td>

						{#if i + 1 === rounds.length}
							<td colspan="2">
								<button on:click={() => newRound()}>New Round</button>
							</td>
						{:else}
							<td>{round.salt}</td>
							<td>{round.current}</td>
						{/if}
					{/await}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="grid">
	<label
		>prev
		<input type="text" bind:value={prev} />
	</label>
	<label
		>salt

		<input type="text" bind:value={salt} />
	</label>
	<label
		>current
		<input type="text" bind:value={current} />
	</label>
</div>
<div>
	Resulting hash:
	{#if prev && salt && current}
		{#await sha256(salt + prev + current)}calculating{:then hash}{hash}{/await}
	{:else}
		enter values to check
	{/if}
</div>
