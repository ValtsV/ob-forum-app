import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Answer } from '../Answer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>('http://localhost:3333/foro/respuestas/preguntas/' + questionId)
  }

  vote(answerId: number, vote: boolean): Observable<any> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response'})
      headers: new HttpHeaders({ observe: 'response'})

    };
    // const headers: new HttpHeaders({ observe: 'response'})

    const data = {vote: vote}
    return this.http.post('http://localhost:3333/foro/votos/respuestas/' + answerId, data, {observe: 'response' as 'body'})
  }
}
