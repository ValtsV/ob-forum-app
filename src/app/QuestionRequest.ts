export interface QuestionRequest {
    description: string,
    title: string,
    isPinned: boolean,
    temaId: number | null
}