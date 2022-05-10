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
    console.log("runs")
    return of(THEMES.filter(theme => theme.cursoId == courseId))
  }

}
