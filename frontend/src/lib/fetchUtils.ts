// useful function to throw an error then fetching (fetch does not do this)

export async function ok(res: Promise<Response>): Promise<Response> {
	const r = await res;
	if (!r.ok) {
		throw new Error(`Fetch was not ok with status ${r.status}`);
	}
	return r;
}
