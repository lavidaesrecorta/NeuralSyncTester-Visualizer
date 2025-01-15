import { error } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { BACKEND_PORT, BACKEND_URL } from '$env/static/private';


export async function load({ params }) {
	return {uid:params.uid,TPM_config:await db.getSessionConfig(params.uid), url:`http://${BACKEND_URL}:${BACKEND_PORT}/events?id=${params.uid}`}

	// error(404, 'Not found');
};