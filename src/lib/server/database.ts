import { BACKEND_PORT, BACKEND_URL } from "$env/static/private"
import { log } from "console"
import { error } from '@sveltejs/kit';


export interface OpenSession{
    Uid: string,
    Config: {
        K:number[],N:number[], H: number,L:number,M:number, data_size: number,
        LearnRule: string,
        LinkType: string
    },
    StartTime: string,
    MaxSessionCount: number,
    CurrentSessionCount: number,
}



export const getOpenSessions = async () => {
    const openSessionsEndpoint = `http://${BACKEND_URL}:${BACKEND_PORT}/sessions`
    let output
    try {
        const response = await fetch(openSessionsEndpoint)
        if (!response.ok) throw new Error(response.statusText)
        output = await response.json()
    } catch (error) {
        // First, check if the error is a TypeError
        if (error instanceof TypeError) {
            // The underlying error (cause) is likely an AggregateError with ECONNREFUSED
            if (error.cause instanceof AggregateError) {
                // Now we search for the ECONNREFUSED error inside the AggregateError's 'errors' array
                const connectionRefusedError = error.cause.errors.find((err: any) => err.code === 'ECONNREFUSED');
                if (connectionRefusedError) {
                    console.error('Connection refused: Unable to reach the server.');
                    return {status: "error", message: "444"}
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
            } else {
                console.error('An unexpected error occurred:', error);
            }
        } else {
            // Catch-all for unexpected error types
            console.error('Unexpected error type:', error);
        }
    }
    return output
}


export const getSurfaceGraphs = async (refresh:boolean) => {
    const openSessionsEndpoint = refresh ?  `http://${BACKEND_URL}:${BACKEND_PORT}/sessionStats-refresh` : `http://${BACKEND_URL}:${BACKEND_PORT}/sessionStats`
    return (await fetch(openSessionsEndpoint)).json()
}

export const getSessionCounts = async (refresh:boolean) => {
    const openSessionsEndpoint = refresh ?  `http://${BACKEND_URL}:${BACKEND_PORT}/sessionCount-refresh` : `http://${BACKEND_URL}:${BACKEND_PORT}/sessionCount`

    return (await fetch(openSessionsEndpoint)).json()
}

export const getSessionConfig = async (uid:string) => {
    const openSessionsEndpoint = `http://${BACKEND_URL}:${BACKEND_PORT}/get-config?id=${uid}`
    return (await fetch(openSessionsEndpoint)).json()

}