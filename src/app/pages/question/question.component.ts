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
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { thumbsUp } from 'src/assets/svg/icons';
import { StorageService } from 'src/app/service/storage.service';
import { User } from 'src/app/User';
import { AnswerRequest } from 'src/app/AnswerRequest';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss', '../../app.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question = {} as Question
  answers: Answer[] = []
  hasAnswers: boolean = false
  theme: Theme = {} as Theme
  course?: Course = {} as Course
  timeSincePublished!: string
  writingModeOn: boolean = false
  img!: any
  currentUser: User = {} as User

  thumbsUp: any = "assets/thumbs-up.svg"

  newAnswer: AnswerRequest = {
    answer: '',
    preguntaId: undefined
  }


  constructor(
    private questionService: QuestionService, 
    private answerService: AnswerService, 
    private themeService: ThemeService, 
    private courseService: CourseService, 
    private storageService: StorageService,
    protected sanitizer: DomSanitizer, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const questionId = Number(this.route.snapshot.paramMap.get('questionId'))
    const themeId = Number(this.route.snapshot.paramMap.get('themeId'))

    this.storageService.currentUser.subscribe(user => this.currentUser = user)

    this.themeService.getTheme(themeId).subscribe(theme => {
      this.theme = theme
      this.courseService.getCourseById(this.theme.cursoId).subscribe(course => this.course = course)
    })
    this.questionService.getQuestionById(questionId).subscribe((question: any) => {
      this.question = question
      this.timeSincePublished = moment(question.updatedAt).fromNow()
    })
    this.answerService.getAnswersByQuestionId(questionId).subscribe(answers => {
      this.answers = answers
      if (answers != null) {
        this.hasAnswers = true
      }
    })
    this.storageService.currentUser.subscribe(user => this.img = user.avatar)
  }


  giveVote(vote: boolean) {
    let newUserVote: boolean | null
    this.question.userVote === vote && this.question.userVote !== null ? newUserVote = null : newUserVote = vote
    this.questionService.vote(this.question.id!, vote).subscribe({
      next: (data) => {
          const updatedQuestion = {...this.question, ...data, userVote: newUserVote}
          this.question = updatedQuestion        
      }
    })
  }

  voteForAnswer({vote, id} : {vote: boolean, id?: number}) {
    this.answerService.vote(id!, vote).subscribe(res => {
      // idea was to get only updated answer, but I'm short on time
      const answers = this.answerService.getAnswersByQuestionId(this.question.id!).subscribe(answers => {
        const oldIndex = this.answers.findIndex(answer => answer.id === id)
        const updatedAnswer = answers.filter(el => el.id === id)
        this.answers[oldIndex].totalNegativeVotes = updatedAnswer[0].totalNegativeVotes
        this.answers[oldIndex].totalPositiveVotes = updatedAnswer[0].totalPositiveVotes
        this.answers[oldIndex].userVote = updatedAnswer[0].userVote
        })
      })
  }

  saveAnswer(answerHtml: string) {
    this.newAnswer = {
      answer: answerHtml,
      preguntaId: Number(this.route.snapshot.paramMap.get('questionId'))
    }
    }

  onAnswerSubmit() {
    this.answerService.saveAnswer(this.newAnswer).subscribe((data: Answer[]) => {
      this.answers = data
    })  
  }



  orderByDate() {
    this.answers = this.answers.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
  }

  orderByVotes() {
    this.answers = this.answers.sort((a, b) => (b.totalPositiveVotes - b.totalNegativeVotes) - (a.totalPositiveVotes - a.totalNegativeVotes))
  }

  toggleWritingMode() {
    this.writingModeOn = !this.writingModeOn
  }

  pinQuestion() {
    this.questionService.updateQuestion({...this.question, pinned: !this.question.pinned}).subscribe((res: any) => {
      this.question = res
    })
  }

  pinAnswer(answer: Answer) {
    this.answerService.updateAnswer({...answer, pinned: !answer.pinned}).subscribe((res: any) => {
      this.answers = res
    })
  }
}
