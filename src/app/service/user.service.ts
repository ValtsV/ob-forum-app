import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../User';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {} as User
  isLoggedIn: boolean = false
  

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getCurrentUser(): Observable<User> {
    return of(this.user)
  }

  setCurrentUser(user: User) {
    this.isLoggedIn = true
    this.user = user
  }
  
  refreshUser(id: number): void {
    this.http.get<User>(`http://localhost:3333/foro/users/${id}`).subscribe(user => {
      this.storageService.saveUser(user)
    })
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn
  }

  setIsLoggedIn(): void {
    this.isLoggedIn = !this.isLoggedIn
  }
}
