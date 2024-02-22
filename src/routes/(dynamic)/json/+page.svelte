<script>
	let value = '';
	let errorMessage = '';
	let errorNestedJSON = '';

	const click = async () => {
		try {
			const parsed = JSON.parse(value);
			console.log(parsed);
			errorMessage = 'No error';
			try {
				const content = JSON.parse(parsed[0].message.content);
				console.log(content);
				errorNestedJSON = 'content parse error';
			} catch (error) {
				errorNestedJSON = error.message;
			}
		} catch (error) {
			errorMessage = error.message;
			console.log(error);
		}
	};
</script>

<div>
	<p>Error: {errorMessage}</p>
	<p>Error nested json [message.content]: {errorNestedJSON}</p>
	<textarea cols="40" rows="5" bind:value on:input={click} />
	<button on:click={click}>CLICK</button>
</div>
