import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { CourseService } from 'src/app/service/course.service';
import {Theme} from '../../Theme';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.scss', '../../app.component.scss']
})
export class CourseviewComponent implements OnInit {
  title!: String
  courseId!: number
  themes: Theme[] = []
 
  constructor(private themeService: ThemeService, private courseService: CourseService) { 
  }

  ngOnInit(): void {
    this.courseService.getSelectedCourse().subscribe((course) => {
      this.title = course.title
      this.courseId = course.id
    this.themeService.getThemes(this.courseId).subscribe((themes) => this.themes = themes);
    })
  }

}
