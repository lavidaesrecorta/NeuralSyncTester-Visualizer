import { BACKEND_PORT, BACKEND_URL } from "$env/static/private";
import type { IterationHistogramRequestBody } from "$lib/sessionCount/sessionCount";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const histogramReqData: IterationHistogramRequestBody = await request.json();
    const url = `http://${BACKEND_URL}:${BACKEND_PORT}/iterationHistogram`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify the content type as JSON
        },
        body: JSON.stringify(histogramReqData),  // Convert the data object to a JSON string
      })
    const sessionData = await response.json();
    
    return new Response(JSON.stringify(sessionData));
};