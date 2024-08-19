import { Banksy } from '@nest25/banksy-sdk';
//todo: Uncomment to use .env variable. The name of variable should has VITE_ prefix.
const BANKSY_CLIENT_KEY = import.meta.env.VITE_BANKSY_CLIENT_KEY_STAGE;
const banksy = new Banksy(BANKSY_CLIENT_KEY);
export default banksy;

export type PaymentProvider = {
	_id: string;
	name: string;
	currencyType: string;
	title?: string;
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

export async function createRedirectLink(
	provider: string,
	amount: number,
	successCallback: string,
	failureCallback: string
) {
	const currency = 'USD';
	const externalClientId = 'tbd';
	const response = await banksy.createPayment({
		amount,
		successCallback,
		failureCallback,
		currency,
		externalClientId,
		currencyType: provider,
		//		provider: "paypal",
		customerEmail: 'nosov@nodeart.io',
		customerName: 'Nosov'
	});
	return response.paymentLink;
}
