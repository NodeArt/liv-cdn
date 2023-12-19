<script lang="ts" xmlns="http://www.w3.org/1999/html">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>News:</h1>
{#each data.data as article}
	<hr />
	<h2><strong>Title</strong>: {article.title}</h2>
	<p><strong>Id:</strong> {article.id}</p>
	<p><strong>Thumbnail:</strong> <img src={article.thumbnail} /></p>
	<p><strong>Category:</strong> {JSON.stringify(article.category)}</p>
	<p><strong>Description:</strong></p>
	<p>{article.description}</p>
	<p><strong>Author:</strong> {article.author}</p>
	<p>link to original: <a href={article.link}>{article.link}</a></p>
	<p><strong>content</strong>:</p>
	<p>{article.content}</p>
	<p><strong>Date linux:</strong>{article.published}</p>
	<p><strong>Date human:</strong> or {new Date(article.published * 1000)}</p>
{/each}

<h1>Data:</h1>
<pre>{JSON.stringify(data)}</pre>

<style>
	img {
		max-height: 200px;
	}
</style>
