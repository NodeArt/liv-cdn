<script>
	let value = '';
	let errorMessage = '';

	const click = async () => {
		try {
			const parsed = JSON.parse(value);
			console.log(parsed)
			errorMessage = 'No error';

		} catch (error) {
			errorMessage = error.message;
			console.log(error);
		}
	};
</script>

<div>
	<p>Error: {errorMessage}</p>
	<textarea cols="40" rows="5" bind:value on:input={click}></textarea>
	<button on:click={click}>CLICK</button>
</div>
