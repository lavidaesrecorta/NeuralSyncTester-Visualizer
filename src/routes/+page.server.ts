import * as db from '$lib/server/database';

export async function load() {
	return {
		// sessions: await db.getSurfaceGraphs()
		sessions: await db.getOpenSessions()
	};
}