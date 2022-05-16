import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/Question';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss', '../../app.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() question = {} as Question
  @Input() isPinned?: boolean
  timeSincePublished: String = "2 días"

  constructor() { }

  ngOnInit(): void {
  }

}
