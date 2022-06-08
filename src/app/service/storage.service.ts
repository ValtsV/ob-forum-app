import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable , of, Subject} from 'rxjs';

const TOKEN_KEY = "auth-token"
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isLogged = new BehaviorSubject<boolean>(this.getUser())

  constructor(private router: Router) { }

  logout(): void {
    window.sessionStorage.clear();
    this.isLogged.next(false)
    this.router.navigate(["login"])
  }

  // FUTURE REFERENCE
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  public isLoggedInBSubject() {
    return this.isLogged
  }

  // USER
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log(user)
      return JSON.parse(user);
      
    }
    return false;
  }

  // TOKEN
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
