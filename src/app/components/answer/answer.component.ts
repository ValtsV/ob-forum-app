import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/app/Answer';
import { AnswerService } from 'src/app/service/answer.service';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss', '../../app.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer = {} as Answer
  timeSincePublished: String = '2 días'

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
  }

  giveVote(vote: boolean) {
    const voteType = vote? 'totalPositiveVotes' : 'totalNegativeVotes'
    
    this.answerService.vote(this.answer.id!, vote).subscribe({
      next: (data) => {
        if (data.status == 204) {
          const updatedAnswer = {...this.answer, [voteType]:  this.answer[voteType] - 1}
          this.answer =  updatedAnswer
        }
        if (data.status == 200) {
          const updatedAnswer = {...this.answer, [voteType]:  this.answer[voteType] + 1}
          this.answer =  updatedAnswer
        }
      },
      error: error => console.log(error.status)
    })
  }
}
