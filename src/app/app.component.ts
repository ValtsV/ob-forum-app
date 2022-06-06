import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './service/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ob-forum-app';
  isLoggedIn: boolean = false
  eventBusSub?: Subscription;

  

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    moment.locale('es')
    //  this.isLoggedIn = this.storageService.isLoggedIn()
    this.storageService.isLoggedIn().subscribe(data => {
      this.isLoggedIn = data
    })

  }
}
