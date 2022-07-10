import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {
  @Input() svg!: string
  @Input() text!: string
  content!: SafeHtml

  constructor(public sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {

  }

}
