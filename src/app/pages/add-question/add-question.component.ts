import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Course';
import { Question } from 'src/app/Question';
import { CourseService } from 'src/app/service/course.service';
import { QuestionService } from 'src/app/service/question.service';
import { ThemeService } from 'src/app/service/theme.service';
import { Theme } from 'src/app/Theme';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss', '../../app.component.scss']
})
export class AddQuestionComponent implements OnInit {
  theme: Theme = {} as Theme
  course: Course = {} as Course
  themeList: Theme[] = []

  newQuestion = {
    description: '',
    title: '',
    temaId: null,
    isPinned: false
  }

  constructor(
    private themeService: ThemeService, 
    private courseService: CourseService, 
    private questionService: QuestionService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    const themeId = Number(this.route.snapshot.paramMap.get('themeId'))

    this.themeService.getTheme(themeId).subscribe({
      next: (theme: Theme) => {
        this.theme = theme
        this.courseService.getCourseById(this.theme.cursoId).subscribe({
          next: (course: Course) => this.course = course,
          error: (error: any) => console.log(error)
        })
            this.themeService.getThemes(this.theme.cursoId).subscribe({
          next: (themes: Theme[]) => this.themeList = themes,
          error: (error: any) => console.log(error)
        })
      }
    })
  }

  saveQuestion(questionHtml: string) {
    this.newQuestion.description = questionHtml
  }

  onSubmit() {
    this.questionService.saveQuestion(this.newQuestion).subscribe({
      next: (data: Question) => this.router.navigate(['temas', this.newQuestion.temaId, 'preguntas', data.id]),
      error: (error: any) => console.log(error)
    })
  }
}
