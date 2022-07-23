import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Course';
import { Question } from 'src/app/Question';
import { QuestionRequest } from 'src/app/QuestionRequest';
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

    this.themeService.getTheme(themeId).subscribe(theme => {
      this.theme = theme
      this.courseService.getCourseById(this.theme.cursoId).subscribe(course => this.course = course)
      this.themeService.getThemes(this.theme.cursoId).subscribe(themes => this.themeList = themes)
    })
  }

  saveQuestion(questionHtml: string) {
    this.newQuestion.description = questionHtml
  }

  onSubmit() {
    // const themeId = Number(this.route.snapshot.paramMap.get('themeId'))
    // this.questionService.saveQuestion({...this.newQuestion, temaId: themeId}).subscribe(data => console.log(data))  }
    this.questionService.saveQuestion(this.newQuestion).subscribe((data: Question) => {
      this.router.navigate(['temas', this.newQuestion.temaId, 'preguntas', data.id])
    })  
  }
  
}
