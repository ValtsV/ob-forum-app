import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/service/theme.service';
import { Theme } from 'src/app/Theme';
import { Course } from 'src/app/Course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-questions-header',
  templateUrl: './questions-header.component.html',
  styleUrls: ['./questions-header.component.scss', '../../app.component.scss']
})
export class QuestionsHeaderComponent implements OnInit {
  course?: Course = {} as Course
  theme: Theme = {} as Theme
  themeId!: number


  constructor(private themeService: ThemeService, private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.themeId = Number(this.route.snapshot.paramMap.get('id'));
    this.themeService.getTheme(this.themeId).subscribe(theme => {
      this.theme = theme
      this.courseService.getCourseById(this.theme.cursoId).subscribe(course => this.course = course)
    })
  }


}
