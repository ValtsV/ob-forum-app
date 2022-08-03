import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../Answer';
import { HttpClient } from '@angular/common/http';
import { AnswerRequest } from '../AnswerRequest';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  url: string = 'http://localhost:3333/foro/respuestas/'

  constructor(private http: HttpClient) { }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.url + 'preguntas/' + questionId)
  }

  saveAnswer(answer: AnswerRequest): Observable<any> {
    return this.http.post(this.url, answer)
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(this.url, answer)
  }

  vote(answerId: number, vote: boolean): Observable<any> {
    const data = {vote: vote}
    return this.http.post(this.url + answerId, data, {observe: 'response' as 'body'})
  }
}
