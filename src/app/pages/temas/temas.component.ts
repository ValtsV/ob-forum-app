import { Component, OnInit } from '@angular/core';
import { CourseviewComponent } from 'src/app/components/courseview/courseview.component';
import { SidemenuComponent } from 'src/app/components/sidemenu/sidemenu.component';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss', '../../app.component.scss']
})
export class TemasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
