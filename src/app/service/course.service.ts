import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { Course } from '../Course';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private selectedCourse$ = new ReplaySubject<Course>()
  url: string = 'http://localhost:3333/foro/cursos'

  courses!: Course[]


  constructor(private http: HttpClient) {   }

  getCourses(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.get<Course[]>(this.url)
  } 
 
  getCourseById(courseId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.get<Course>(this.url + '/' + courseId)
  }

  getSelectedCourse(): Observable<Course> {
    return this.selectedCourse$.asObservable()
  }

  setSelectedCourse(course: Course): void {
    this.selectedCourse$.next(course)
  }
}
