import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/Question';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = []
  pinnedQuestions: Question[] = []
  status: boolean = true

  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const themeId = Number(this.route.snapshot.paramMap.get('id'));
    this.questionService.getQuestionsByTemaId(themeId).subscribe(questions => {
      questions.forEach(question => {
        question.pinned ? this.pinnedQuestions.push(question) : this.questions.push(question)
      })
    })
  }


  orderByPositiveVotes() {
    this.questions = this.questions.sort((a,b) => {
      if(a.totalPositiveVotes - a.totalNegativeVotes < b.totalPositiveVotes - b.totalNegativeVotes) {
        return 1
      }
      return 0
    })
    this.status = true
  }

  orderByDate() {
    this.questions = this.questions.sort((a,b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    this.status = false
  }
} 
