import { User } from "./User"

export interface Answer {
        id?: number,
        updatedAt: string,
        answer: String,
        preguntaId: number,
        totalPositiveVotes: number,
        totalNegativeVotes: number,
        user: User
        userVote: boolean | null
        pinned: boolean
    
}