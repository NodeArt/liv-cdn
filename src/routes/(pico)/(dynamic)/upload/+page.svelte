<script>
	import { enhance } from '$app/forms';
	let loading = false;
	let link = '';
	let error = '';
</script>

<form
	method="post"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		// `formElement` is this `<form>` element
		// `formData` is its `FormData` object that's about to be submitted
		// `action` is the URL to which the form is posted
		// calling `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted
		loading = true;

		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
			loading = false;
			update();
			if (result.type === 'success' && result.data.success === true && result.data.link) {
				link = result.data.link;
			}
			if (result !== 'success') error = result.data.message;
		};
	}}
	enctype="multipart/form-data"
>
	<div class="group">
		<label for="file">Upload your file</label>
		<input type="file" id="file" name="fileToUpload" required />
	</div>

	<button type="submit" aria-busy={loading}>Submit</button>
</form>
{#if link}
	<a href={link}>download file back</a>
{/if}
{#if error}
	<p>Error uploading: {error}</p>
{/if}
