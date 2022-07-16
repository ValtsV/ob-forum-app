import { User } from "./User"

export interface Question {
    id?: number,
    updatedAt: string,
    description: string,
    title: string,
    totalPositiveVotes: number,
    totalNegativeVotes: number,
    totalRespuestas: number,
    pinned: boolean,
    userVote: boolean | null,
    user: User
    
}