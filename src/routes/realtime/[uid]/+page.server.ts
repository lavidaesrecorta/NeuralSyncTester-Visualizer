import { error } from '@sveltejs/kit';
import * as db from '$lib/server/database';


export async function load({ params }) {
	return {uid:params.uid,TPM_config:await db.getSessionConfig(params.uid)}

	// error(404, 'Not found');
};