import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {} as User
  isLoggedIn: boolean = false
  

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return of(this.user)
  }

  setCurrentUser(user: User) {
    this.isLoggedIn = true
    this.user = user
  }
  

  getIsLoggedIn(): boolean {
    return this.isLoggedIn
  }

  setIsLoggedIn(): void {
    this.isLoggedIn = !this.isLoggedIn
  }

  followQuestion(userId: number, questionId: number): void {

  }

  unfollowQuestion(userId: number, questionId: number): void {
    
  }

  followTheme(userId: number, themeId: number): void {

  }

  unfollowTheme(userId: number, themeId: number): void {

  }
}
