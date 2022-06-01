import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs'
import { Theme } from '../Theme';
import { THEMES } from '../THEMES_MOCK_DATA';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  url: string = 'http://localhost:3333/foro/temas/'


  constructor(private http: HttpClient) { }

  getThemes(courseId: number): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    const httpOptions = {
      withCredentials: true
    };
    return this.http.get<Theme[]>(this.url + 'cursos/' + courseId)
    // return of(THEMES.filter(theme => theme.cursoId == courseId))
  }

  getTheme(themeId: number): Observable<Theme> {
    return this.http.get<Theme>(this.url + themeId)
  }
}
