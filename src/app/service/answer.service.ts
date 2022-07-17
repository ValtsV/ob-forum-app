import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Answer } from '../Answer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnswerRequest } from '../AnswerRequest';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>('http://localhost:3333/foro/respuestas/preguntas/' + questionId)
  }

  saveAnswer(answerText: string, answerId: number): Observable<any> {
    const answerRequest: AnswerRequest = {
      answer: answerText,
      preguntaId: answerId
    }
    return this.http.post('http://localhost:3333/foro/respuestas', answerRequest)
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>('http://localhost:3333/foro/respuestas', answer)
  }

  vote(answerId: number, vote: boolean): Observable<any> {
    const data = {vote: vote}
    return this.http.post('http://localhost:3333/foro/votos/respuestas/' + answerId, data, {observe: 'response' as 'body'})
  }
}
