import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Course';
import { CourseService } from 'src/app/service/course.service';
import { QuestionService } from 'src/app/service/question.service';
import { ThemeService } from 'src/app/service/theme.service';
import { Theme } from 'src/app/Theme';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  theme: Theme = {} as Theme
  course: Course = {} as Course
 

  constructor(private themeService: ThemeService, private courseService: CourseService, private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const themeId = Number(this.route.snapshot.paramMap.get('themeId'))

    this.themeService.getTheme(themeId).subscribe(theme => {
      this.theme = theme
      this.courseService.getCourseById(this.theme.cursoId).subscribe(course => this.course = course)
    })
  }

  saveQuestion(questionHtml: string) {
    const themeId = Number(this.route.snapshot.paramMap.get('themeId'))
    this.questionService.saveQuestion(questionHtml, themeId).subscribe(data => console.log(data))
  }


}
