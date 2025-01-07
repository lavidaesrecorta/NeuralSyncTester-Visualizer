import { BACKEND_PORT, BACKEND_URL } from "$env/static/private";
import type { NewNoOverlapRequestBody } from "$lib/sessionSummary/sessionRequestTypes";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const newSessionReqData: NewNoOverlapRequestBody = await request.json();
    const url = `http://${BACKEND_URL}:${BACKEND_PORT}/newNoOverlap`
    const simControllerResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify the content type as JSON
        },
        body: JSON.stringify(newSessionReqData),  // Convert the data object to a JSON string
      })
    const sessionData = await simControllerResponse.json();
    
    return new Response(JSON.stringify(sessionData));
};