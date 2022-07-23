import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/Answer';
import * as moment from 'moment';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss', '../../app.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer = {} as Answer
  @Input() canPin: boolean = false
  timeSincePublished!: string
  @Output() voteEvent = new EventEmitter<{vote: boolean, id: number}>()
  @Output() pinEvent = new EventEmitter<Answer>()

  constructor() { }

  ngOnInit(): void {
    this.timeSincePublished = moment(this.answer.updatedAt).fromNow()
  }


  giveVote(vote: boolean) {
    this.voteEvent.emit({vote, id: this.answer.id!})
  }

  pinAnswer() {
    this.pinEvent.emit(this.answer)
  }
}
