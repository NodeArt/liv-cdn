import { Banksy } from '@nest25/banksy-sdk';
//todo: Uncomment to use .env variable. The name of variable should has VITE_ prefix.
//const BANKSY_CLIENT_KEY = import.meta.env.VITE_BANKSY_CLIENT_KEY;
const BANKSY_CLIENT_KEY = 'ck_test_f39f8a74-1267-4ce8-a0cb-e19e2597c105';
console.info('Banksy client key:', BANKSY_CLIENT_KEY);
const banksy = new Banksy(BANKSY_CLIENT_KEY);
export default banksy;

export type PaymentProvider = {
	_id: string;
	name: string;
	currencyType: string;
	title?: string
};

export async function checkPayment(paymentId: string): Promise<boolean> {
	if (!paymentId) {
		console.error('No paymentId found in url!');
		return false;
	}
	const paymentData = await banksy.getPayment(paymentId);
	console.info('Banksy paymentData', paymentData);
	return paymentData.status === 'success';
}

export async function createRedirectLink(provider: PaymentProvider, amount: number, successUrl: string, failUrl: string) {
	const currency = 'USD';
	const externalClientId = 'tbd';
	const response = await banksy.createPayment(
		provider.currencyType,
		amount,
		currency,
		successUrl,
		failUrl,
		externalClientId
	);
	return response.paymentLink;
}
