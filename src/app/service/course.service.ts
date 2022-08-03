import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Course } from '../Course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private selectedCourse$ = new ReplaySubject<Course>()
  url: string = 'http://localhost:3333/foro/cursos/'

  courses!: Course[]


  constructor(private http: HttpClient) {   }

  getCourses(): Observable<any> {
    return this.http.get<Course[]>(this.url)
  } 
 
  getCourseById(courseId: number): Observable<any> {
    return this.http.get<Course>(this.url + courseId)
  }

  getSelectedCourse(): Observable<Course> {
    return this.selectedCourse$.asObservable()
  }

  setSelectedCourse(course: Course): void {
    this.selectedCourse$.next(course)
  }

  checkFollowStatus(courseId: number): Observable<boolean> {
    return this.http.get<boolean>(this.url + courseId + "/followers")
  }

  followCourse(courseId: number) : Observable<Response> {
    return this.http.post<Response>(this.url + courseId + "/followers", null)
  }

  deleteFollower(courseId: number) : Observable<Response> {
    return this.http.delete<Response>(this.url + courseId + "/followers")
  }
}
