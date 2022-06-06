import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Course';
import { Question } from 'src/app/Question';
import { Answer } from 'src/app/Answer';
import { CourseService } from 'src/app/service/course.service';
import { QuestionService } from 'src/app/service/question.service';
import { ThemeService } from 'src/app/service/theme.service';
import { Theme } from 'src/app/Theme';
import { AnswerService } from 'src/app/service/answer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss', '../../app.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question = {} as Question
  answers: Answer[] = []
  theme: Theme = {} as Theme
  course?: Course = {} as Course
  timeSincePublished: String = "2 días"


  constructor(private questionService: QuestionService, private answerService: AnswerService, private themeService: ThemeService, private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const questionId = Number(this.route.snapshot.paramMap.get('questionId'))
    const themeId = Number(this.route.snapshot.paramMap.get('themeId'))

    this.themeService.getTheme(themeId).subscribe(theme => {
      this.theme = theme
      this.courseService.getCourseById(this.theme.cursoId).subscribe(course => this.course = course)
    })
    // err => {
    //   if (err.status === 403)
    //       // this.eventBusService.emit(new EventData('logout', null));
    // })

    this.questionService.getQuestionById(questionId).subscribe(question => {
      this.question = question})
    this.answerService.getAnswersByQuestionId(questionId).subscribe(answers => this.answers = answers)
  }


  giveVote(vote: boolean) {
    const voteType = vote? 'totalPositiveVotes' : 'totalNegativeVotes'
    

    this.questionService.vote(this.question.id!, vote).subscribe({
      next: (data) => {
          const updatedQuestion = {...this.question, ...data}
          this.question = updatedQuestion
        
      },
      error: error => console.log(error.status)
    })
  }

  saveAnswer(answerHtml: string) {
    const questionId = Number(this.route.snapshot.paramMap.get('questionId'))
    this.answerService.saveAnswer(answerHtml, questionId).subscribe(data => console.log(data))
  }

}
