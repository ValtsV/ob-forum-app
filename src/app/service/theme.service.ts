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
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Theme[]>(this.url + 'cursos/' + courseId, httpOptions)
    // return of(THEMES.filter(theme => theme.cursoId == courseId))
  }

  getTheme(themeId: number): Observable<Theme> {
    const theme = THEMES.find(theme => theme.id === themeId)
    if(theme === undefined) {
      return of({} as Theme)
    }
    return of(theme)
  }
}
