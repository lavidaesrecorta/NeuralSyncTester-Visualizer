import { BACKEND_PORT, BACKEND_URL } from "$env/static/private"
import { log } from "console"


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
    return (await fetch(openSessionsEndpoint)).json()
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