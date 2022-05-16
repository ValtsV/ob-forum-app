import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/app/Answer';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss', '../../app.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer = {} as Answer
  timeSincePublished: String = '2 días'

  constructor() { }

  ngOnInit(): void {
  }

}
