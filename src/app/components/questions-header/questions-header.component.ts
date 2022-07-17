import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/service/theme.service';
import { Theme } from 'src/app/Theme';
import { Course } from 'src/app/Course';
import { CourseService } from 'src/app/service/course.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from 'src/app/service/storage.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-questions-header',
  templateUrl: './questions-header.component.html',
  styleUrls: ['./questions-header.component.scss', '../../app.component.scss']
})
export class QuestionsHeaderComponent implements OnInit {
  course?: Course = {} as Course
  courseImg!: any
  theme: Theme = {} as Theme
  themeId!: number
  currentUser: User = {} as User


  constructor(private themeService: ThemeService, private courseService: CourseService, private storageService: StorageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.themeId = Number(this.route.snapshot.paramMap.get('id'));
    this.themeService.getTheme(this.themeId).subscribe(theme => {
      this.theme = theme
      this.courseService.getCourseById(this.theme.cursoId).subscribe(course => {
        this.course = course
        this.courseImg = course.avatar
           
      })
    })
    this.storageService.currentUser.subscribe(user => this.currentUser = user)
  }


}
