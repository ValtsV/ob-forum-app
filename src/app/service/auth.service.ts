import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthData } from '../AuthData';
import { User } from '../User';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = 'http://localhost:3333/foro/auth/login'


  constructor(private http: HttpClient, private courseService: CourseService) { }

  login(authData: AuthData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(this.url, authData, httpOptions)
  }
}
