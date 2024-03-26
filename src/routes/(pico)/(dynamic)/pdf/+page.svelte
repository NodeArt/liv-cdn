<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import WebViewer from '@pdftron/pdfjs-express-viewer';

	let viewer;
	let searchText;

	let instance = null;

	onMount(async () => {
		WebViewer(
			{
				path: '/pdfjsexpress',
				licenseKey: '1njek4XpdR0uCYr21RyY'
			},
			viewer
		).then((inst) => {
			instance = inst;
			inst.loadDocument('/pdf.pdf');
		});
	});

	function onSearch() {
		console.log('search', searchText);
		instance?.UI?.searchText(searchText, {
			//...options // see the API reference for options
		});
	}
</script>

<article>
	<input type="text" bind:value={searchText} on:input={onSearch} />
	{searchText}
	<div bind:this={viewer} />
</article>

<div id="viewer" />

<style>
	div {
		margin: 0 auto;
		width: 100%;
		height: 100%;
		min-height: 1000px;
	}
</style>
