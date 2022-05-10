import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/Course';
import { Theme } from 'src/app/Theme';

@Component({
  selector: 'app-themecard',
  templateUrl: './themecard.component.html',
  styleUrls: ['./themecard.component.scss']
})
export class ThemecardComponent implements OnInit {
  @Input() theme!: Theme;

  constructor() { }

  ngOnInit(): void {
  }

}
