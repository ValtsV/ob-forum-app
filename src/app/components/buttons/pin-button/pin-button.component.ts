import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pin-button',
  templateUrl: './pin-button.component.html',
  styleUrls: ['./pin-button.component.scss']
})
export class PinButtonComponent implements OnInit {
  @Input() pinned: boolean = false
  @Input() type?: string = undefined
  @Input() id?: number = undefined
  @Output() currentId: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  emitId() {
    this.currentId.emit(this.id)
  }
}
