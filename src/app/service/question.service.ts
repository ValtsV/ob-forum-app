import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Question } from '../Question';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { QuestionRequest } from '../QuestionRequest';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url: string = 'http://localhost:3333/foro/votos/preguntas'


  constructor(private http: HttpClient) { }

  getQuestionsByTemaId(themeId: number): Observable<Question[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response'})

    };
    return this.http.get<Question[]>('http://localhost:3333/foro/preguntas/temas/' + themeId)
  }

  getQuestionById(questionId: number): Observable<Question> {
    return this.http.get<Question>('http://localhost:3333/foro/preguntas/' + questionId)
  }

  saveQuestion(questionHtml: string, themeId: number): Observable<any> {
    const questionRequest: QuestionRequest = {
      description: questionHtml,
    title: "Pregunta title",
    pinned: false,
    temaId: themeId
    }
    return this.http.post('http://localhost:3333/foro/preguntas', questionRequest)
  }

  vote(questionId: number, vote: boolean): Observable<any> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response'})
      headers: new HttpHeaders({ observe: 'response'})

    };
    // const headers: new HttpHeaders({ observe: 'response'})

    const data = {vote: vote}
    return this.http.post<any>('http://localhost:3333/foro/votos/preguntas/' + questionId, data)
    .pipe(map(res => res.map((votes: any) => votes.vote)))
    .pipe(map(res => {
      const totalPositiveVotes = res.filter(Boolean).length
      const totalNegativeVotes = res.length - totalPositiveVotes
      return {
        totalPositiveVotes: totalPositiveVotes,
        totalNegativeVotes: totalNegativeVotes
      }
    }))
  }
}
