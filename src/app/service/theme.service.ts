import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs'
import { Theme } from '../Theme';
import { THEMES } from '../THEMES_MOCK_DATA';
import { COURSES } from '../COURSES_MOCK_DATA';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  getThemes(courseId: number): Observable<Theme[]> {
    return of(THEMES.filter(theme => theme.cursoId == courseId))
  }

  getTheme(themeId: number): Observable<Theme> {
    const theme = THEMES.find(theme => theme.id === themeId)
    if(theme === undefined) {
      return of({} as Theme)
    }
    return of(theme)
  }
}
