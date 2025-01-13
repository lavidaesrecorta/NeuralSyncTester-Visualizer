import { BACKEND_PORT, BACKEND_URL } from "$env/static/private";
import type { IterationHistogramRequestBody } from "$lib/sessionCount/sessionCount";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const histogramReqData: IterationHistogramRequestBody = await request.json();
    const url = `http://${BACKEND_URL}:${BACKEND_PORT}/iterationHistogram`
    try {
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify the content type as JSON
        },
        body: JSON.stringify(histogramReqData),  // Convert the data object to a JSON string
      })
      if(!response.ok){
        console.log(response.status);
      }
      
      const sessionData = await response.json();
      const outputResponse = {status: "success", histogram: sessionData["histogram"]}
      return new Response(JSON.stringify(outputResponse));
    } catch (error) {
     // First, check if the error is a TypeError
     if (error instanceof TypeError) {
      // The underlying error (cause) is likely an AggregateError with ECONNREFUSED
      if (error.cause instanceof AggregateError) {
          // Now we search for the ECONNREFUSED error inside the AggregateError's 'errors' array
          const connectionRefusedError = error.cause.errors.find((err: any) => err.code === 'ECONNREFUSED');
          if (connectionRefusedError) {
              console.error('Connection refused: Unable to reach the server.');
              return new  Response(JSON.stringify({status: "error", message: "444"}))
          } else {
              console.error('An error occurred within AggregateError:', error);
          }
      } else {
          console.error('A TypeError occurred, but no ECONNREFUSED cause:', error);
      }
  } else if (error instanceof Error) {
      // If it's a general error, check for ECONNREFUSED in the error message
      if (error.message.includes('ECONNREFUSED')) {
          console.error('Connection refused: Unable to reach the server.');
          return new  Response(JSON.stringify({status: "error", message: "444"}))
      } else {
          console.error('An unexpected error occurred:', error);
      }
  } else {
      // Catch-all for unexpected error types
      console.error('Unexpected error type:', error);
  }
  return new  Response(JSON.stringify({status: "error", message: "500"}))
    }
};