import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/Course';
import { Theme } from 'src/app/Theme';

@Component({
  selector: 'app-themecard',
  templateUrl: './themecard.component.html',
  styleUrls: ['./themecard.component.scss']
})
export class ThemecardComponent implements OnInit {
  @Input() theme: Theme = {} as Theme;
  themeColor: string | undefined = undefined
  iconBgColor: string | undefined = undefined
  icon: string = ''


  constructor() { }

  ngOnInit(): void {
    this.icon = `<span>${this.theme.moduloId}</span>`
    switch (this.theme.title) {
      case "General":
          this.themeColor = 'linear-gradient(99.9deg, #32D5A4 2.1%, #32D5D5 109.65%)'
          this.iconBgColor = '#23ADA5'
        break;
      case "Errores":
          this.themeColor = 'linear-gradient(98.96deg, #EC555E -3.33%, #C72D64 113.09%)'
          this.iconBgColor = '#B21E50'
        break;
      case "Proyectos":
          this.themeColor = 'linear-gradient(97.33deg, #2834BA -0.11%, #3966DB 105.93%)'
          this.iconBgColor = '#1B2382'
        break;
      default:
        break;
    }
  }

}
