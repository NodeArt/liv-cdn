<script lang="ts">
	import banksy from '$lib/utils/banksy';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';

	const url = get(page).url;
	const params = get(page).params;
	const paymentId = url.searchParams.get('paymentId');

	async function checkPayment() {
		if (!paymentId) {
			console.error('No paymentId found in url!');
			return false;
		}
		const paymentData = await banksy.getPayment(paymentId);
		console.info('Banksy paymentData', paymentData);
		return paymentData.status === 'success';
	}

	async function createRedirectLink() {
		const provider = providers.find(p => p.name === selectedProvider);
		if (!provider) {
			console.error('No Provider fond to create link!', 'selected provider name:', selectedProvider);
			return;
		}
		const currentUrl = url + base;
		const amount = 19999;
		const currency = "USD";
		const externalClientId = 'tbd';
		const successUrl = currentUrl + '/success';
		const failUrl = currentUrl + '/fail';
		const response = await banksy.createPayment(
				provider.currencyType,
				amount,
				currency,
			successUrl,
			failUrl,
			externalClientId
		);
		console.log(response);
		return response.paymentLink;
	}

	let selectedProvider: string;
	let redirectLink: string;
	let providers: { _id: string; name: string; currencyType: string; title?: string; }[];
	banksy.getProviders().then((data) => {
		console.log('providers data', data);
		providers = data;
		selectedProvider = data[0].name;
	});

	if (params.status) {
		checkPayment();
	}
	async function pay() {
		const link = await createRedirectLink();
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
		<select name="providers" id="providers">
				{#each providers as provider (provider._id)}
					<option value={provider.name}>{provider.title || provider.name}</option>
				{/each}
		</select>
		<button on:click={pay}>Pay</button>
	{:else}
		<p>Loading...</p>
	{/if}
{/if}

