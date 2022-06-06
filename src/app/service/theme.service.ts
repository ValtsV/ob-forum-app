import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { Theme } from '../Theme';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  url: string = 'http://localhost:3333/foro/temas/'


  constructor(private http: HttpClient) { }

  getThemes(courseId: number): Observable<any> {
    return this.http.get<Theme[]>(this.url + 'cursos/' + courseId)
  }

  getTheme(themeId: number): Observable<Theme> {
    return this.http.get<Theme>(this.url + themeId)
  }
}
