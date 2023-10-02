import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (
			!(formData.fileToUpload as File).name ||
			(formData.fileToUpload as File).name === 'undefined'
		) {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		const { fileToUpload } = formData as { fileToUpload: File };

		const upload = await fetch(`https://transfer.sh/${fileToUpload.name}`, {
			headers: {
				accept: '*/*'
			},
			method: 'PUT',
			body: fileToUpload
		});
		const link = await upload.text();

		return {
			success: true,
			link
		};
	}
};
