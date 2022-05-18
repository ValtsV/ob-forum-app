import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  followQuestion(userId: number, questionId: number): void {

  }

  unfollowQuestion(userId: number, questionId: number): void {
    
  }

  followTheme(userId: number, themeId: number): void {

  }

  unfollowTheme(userId: number, themeId: number): void {

  }
}
