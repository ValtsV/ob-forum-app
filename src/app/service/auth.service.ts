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
  url: string = 'http://localhost:3333/foro/auth/'


  constructor(private http: HttpClient, private courseService: CourseService) { }

  login(authData: AuthData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // const httpOptions = {
    //   withCredentials: true
    // };
    return this.http.post<User>(this.url + 'login', authData, httpOptions)
  }

  register(username: string, email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.url + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.url + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}
