import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ANSWERS } from '../ANSWER_MOCK_DATA';
import { Answer } from '../Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor() { }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return of(ANSWERS)
  }
}
