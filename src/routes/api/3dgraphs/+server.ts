import { BACKEND_PORT, BACKEND_URL } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export interface GraphRequestData{
    X: string,
    Y: string,
    LearnRule: string,
    Scenario: string,
    TableName?: string,
}

export const POST: RequestHandler = async ({ request }) => {
	const graphReqData: GraphRequestData = await request.json();
    const url = `http://${BACKEND_URL}:${BACKEND_PORT}/query3DGraph`
    const graphResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify the content type as JSON
        },
        body: JSON.stringify(graphReqData),  // Convert the data object to a JSON string
      })
    const graphData = {data: await graphResponse.json()};
    
    return new Response(JSON.stringify(graphData));
};