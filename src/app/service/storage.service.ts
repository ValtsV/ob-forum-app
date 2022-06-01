import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-token"
const REFRESHTOKEN_KEY = "auth-refreshtoken";
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  logout(): void {
    window.sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  // USER
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  // TOKEN
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    // console.log("get token func")
    // console.log(window.sessionStorage.getItem(TOKEN_KEY))
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // REFRESH TOKEN
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }
  
}
