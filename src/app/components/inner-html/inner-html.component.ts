import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-inner-html',
  templateUrl: './inner-html.component.html',
  styleUrls: ['./inner-html.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class InnerHtmlComponent implements OnInit {
  @Input() html: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
