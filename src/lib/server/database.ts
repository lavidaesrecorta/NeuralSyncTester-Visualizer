import { BACKEND_PORT, BACKEND_URL } from "$env/static/private"
import { log } from "console"


export interface OpenSession{
    Uid: string,
    Config: {
        K:number[],N:number[],L:number,M:number,
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

export const getSurfaceGraphs = async () => {
    const openSessionsEndpoint = `http://${BACKEND_URL}:${BACKEND_PORT}/sessionStats`
    return (await fetch(openSessionsEndpoint)).json()
}