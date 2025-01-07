import * as db from '$lib/server/database';
import { error } from '@sveltejs/kit';

export async function load() {
	const sessions= await db.getOpenSessions()
	if(sessions.status == "error"){
		switch (sessions.message) {
			case "444":
				error(444, {
					message: "No Response from server."
				})
			default:
				error(500, {
					message: "Internal server error."
				})
		}
	}
	return {
		// sessions: await db.getSurfaceGraphs()
		sessions: sessions
	};
}