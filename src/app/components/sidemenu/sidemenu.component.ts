import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course = {} as Course
  showCourses: boolean = true

  constructor(
    private courseService: CourseService
    ) {   }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses
        this.courseService.setSelectedCourse(courses[0])  
      },
      error: (error: any) => console.log(error)
    })
    this.courseService.getSelectedCourse().subscribe({
      next: (course: Course) => this.selectedCourse = course,
      error: (error: any) => console.log(error)
    })
  }

  // select course from menu
  selectCourse = (course: Course) => {
    this.courseService.setSelectedCourse(course)}

  // show/not show course menu 
  toggleCoursesMenu() {
    this.showCourses = !this.showCourses
  }  
}


