<script lang="ts">
	import banksy from '$lib/utils/banksy';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	const url = get(page).url;

	async function createRedirectLink() {
		const provider = providersData.find(p => p.name === selectedProvider);
		if (!provider) {
			console.error('No Provider fond to create link!', 'selected provider name:', selectedProvider);
			return;
		}
		const name = provider.name;
		const currentUrl = url + base;
		const amount = 19999;
		const currency = "USD";
		const externalClientId = 'tbd';
		const successUrl = currentUrl + '/success';
		const failUrl = currentUrl + '/fail';
		console.log(provider.currencyType,
				amount,
				currency,
				successUrl,
				failUrl,
				externalClientId);
		const paymentData = await banksy.createPayment(
				provider.currencyType,
				amount,
				currency,
			successUrl,
			failUrl,
			externalClientId
		);
		console.log('paymentData', paymentData);
		redirectLink = paymentData;
	}

	let selectedProvider: string;
	let redirectLink: string;
	let providersData: { _id: string; name: string; currencyType: string; title?: string; }[];
	banksy.getProviders().then((data) => {
		console.log('providers data', data);
		providersData = data;
		selectedProvider = data[0].name;
	});

</script>

{#if providersData}
	<select name="providers" id="providers">
			{#each providersData as provider (provider._id)}
				<option value={provider.name}>{provider.title || provider.name}</option>
			{/each}
	</select>
	<button on:click={createRedirectLink}>Pay</button>
{:else}
	<p>Loading...</p>
{/if}
{#if redirectLink?.length}
	<a href={redirectLink}>Pay!</a>
{/if}
