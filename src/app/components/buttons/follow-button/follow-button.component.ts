import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  @Input() isFollowing: boolean = false
  @Input() type?: string = undefined

  constructor() { }

  ngOnInit(): void {
  }

  // emitId() {
  //   this.currentId.emit(this.id)
  // }
}
