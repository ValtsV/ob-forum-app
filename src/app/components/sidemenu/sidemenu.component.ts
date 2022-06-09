import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/Course';
import { CourseService } from 'src/app/service/course.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course = {} as Course
  courseImg!: any

  constructor(private courseService: CourseService, private fileService: FileUploadService, protected sanitizer: DomSanitizer) {   }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses
      this.courseService.setSelectedCourse(courses[0])    
      })

    
    this.courseService.getSelectedCourse().subscribe((course) => this.selectedCourse = course)
  }

  selectCourse = (course: Course) => {
    this.courseService.setSelectedCourse(course)}

  
}


