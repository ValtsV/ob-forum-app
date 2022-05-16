import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QUESTIONS } from '../QUESTIONS_MOCK_DATA';
import { Question } from '../Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestionsByTemaId(temaId: number): Observable<Question[]> {
    return of(QUESTIONS)
  }

  getQuestionById(questionId: number): Observable<Question> {
    const question = QUESTIONS.find(question => question.id === questionId)
      if (!question) {
        throw new Error("Question not found")
      }
    return of(question)
  }
}
