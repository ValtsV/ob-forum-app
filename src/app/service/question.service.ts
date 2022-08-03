import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Question } from '../Question';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { QuestionRequest } from '../QuestionRequest';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url: string = 'http://localhost:3333/foro/preguntas/'


  constructor(private http: HttpClient) { }

  getQuestionsByTemaId(themeId: number): Observable<Question[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response'})

    };
    return this.http.get<Question[]>(this.url + 'temas/' + themeId)
  }

  getQuestionById(questionId: number): Observable<Question> {
    return this.http.get<Question>(this.url + questionId)
  }

  saveQuestion(newQuestion: QuestionRequest): Observable<any> {
    return this.http.post(this.url, newQuestion)
  }

  vote(questionId: number, vote: boolean): Observable<any> {
    const data = {vote: vote}
    return this.http.post<any>(this.url + questionId, data)
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

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(this.url, question)
  }

  checkFollowStatus(questionId: number): Observable<boolean> {
    return this.http.get<boolean>(this.url + questionId + "/followers")
  }

  followQuestion(questionId: number) : Observable<Response> {
    return this.http.post<Response>(this.url + questionId + "/followers", null)
  }

  deleteFollower(questionId: number) : Observable<Response> {
    return this.http.delete<Response>(this.url + questionId + "/followers")
  }
 }
