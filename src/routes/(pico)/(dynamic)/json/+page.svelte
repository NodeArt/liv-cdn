<script>
	let value = '';
	let errorMessage = '';
	let errorNestedJSON = '';
	let errorSymbol = '';

	const click = async () => {
		try {
			const parsed = JSON.parse(value);
			console.log(parsed);
			errorMessage = 'No error';
			errorSymbol = '';
			try {
				const content = JSON.parse(parsed[0].message.content);
				console.log(content);
				errorNestedJSON = 'no content parse error';
			} catch (error) {
				console.log(/^[^\d]*(\d+)/.exec(error.message)[1]);
				errorNestedJSON = error.message;
				let errPos = Number(/^[^\d]*(\d+)/.exec(error.message)[1]);
				errorSymbol = parsed[0]?.message?.content?.slice(Math.max(0, errPos - 7), errPos + 3);
			}
		} catch (error) {
			errorMessage = error.message;
			let errPos = Number(/^[^\d]*(\d+)/.exec(error.message)[1]);
			console.log(Math.max(1, errPos - 7));
			errorSymbol = value.slice(Math.max(0, errPos - 7), errPos + 3);
		}
	};
</script>

<div>
	<p>Error: {errorMessage}</p>
	<p>Error nested json [message.content]: {errorNestedJSON}</p>
	<p>Error Symbol: {errorSymbol}</p>
	<textarea cols="40" rows="5" bind:value on:input={click} />
	<button on:click={click}>CLICK</button>
</div>
