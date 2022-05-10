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

  constructor(private courseService: CourseService) {   }

  ngOnInit(): void {
    this.courseService.getCourses(1).subscribe((courses) => {
      this.courses = courses
      this.selectedCourse = courses[0]
      this.courseService.setSelectedCourse(this.selectedCourse)
    })
    this.courseService.getSelectedCourse().subscribe((course) => this.selectedCourse = course)
  }

  smthf = (course: Course) => {
    this.courseService.setSelectedCourse(course)}


}