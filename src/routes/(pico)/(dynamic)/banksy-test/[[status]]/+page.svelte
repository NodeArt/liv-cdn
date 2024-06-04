<script lang="ts">
	import banksy, {
		checkPayment,
		createRedirectLink,
		type PaymentProvider
	} from '$lib/utils/banksy';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';

	const pagePath = 'banksy-test';
	const url = get(page).url;
	const params = get(page).params;
	const paymentId = url.searchParams.get('paymentId');
	let selectedProvider: string;
	let providers: PaymentProvider[];
	banksy.getProviders().then((data) => {
		providers = data;
		providers.push({title: "crypto (disabled)", currencyType:"crypto", name: "crypto"})
		selectedProvider = data[0].currencyType;
	});

	if (params.status && paymentId) {
		checkPayment(paymentId);
	}

	async function pay() {
		const successUrl = url.origin + base + '/' + pagePath + '/success';
		const failUrl = url.origin + base + '/' + pagePath + '/fail';
		if (!selectedProvider) {
			console.error('Provider is required to create a payment link!');
			return;
		}
		const link = await createRedirectLink(selectedProvider, 20, successUrl, failUrl);
		if (!link?.length) {
			console.error('No link created!');
			return;
		}
		if (browser) {
			window.location.href = link;
		} else {
			console.warn('Should be redirected?');
		}
	}
</script>

{#if params.status === 'success'}
	<h1>Payment successful!</h1>
{/if}

{#if params.status === 'fail'}
	<h1>Payment failed!</h1>
{/if}

{#if !params.status}
	{#if providers?.length}
		<select name="providers" id="providers" bind:value={selectedProvider}>
			{#each providers as provider (provider._id)}
				<option value={provider.currencyType}>{provider.title || provider.name}: {provider.currencyType}</option>
			{/each}
		</select>
		<button on:click={pay}>Pay</button>
	{:else}
		<p>Loading...</p>
	{/if}
{/if}
