import { User } from "./User"

export interface Question {
    id?: number,
    updatedAt: String,
    description: String,
    title: String,
    totalPositiveVotes: number,
    totalNegativeVotes: number,
    totalRespuestas: number,
    user: User,
    pinned: boolean
}