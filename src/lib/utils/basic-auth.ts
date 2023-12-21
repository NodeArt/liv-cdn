import { type ServerLoadEvent, type RequestEvent, error } from '@sveltejs/kit';

const defaultLogins = [{ login: 'cc:cc' }];

export const check = (
	{ setHeaders, request }: ServerLoadEvent | RequestEvent,
	options?: {
		logins?: string[];
	}
) => {
	const auth = request.headers.get('Authorization');
	const logins = options?.logins ?? defaultLogins.map((it) => it.login);
	const loggedIn = logins.find((login) => auth === `Basic ${btoa(login)}`);
	if (!loggedIn) {
		setHeaders({
			'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
		});
		error(401, 'provide password');
	}
};
