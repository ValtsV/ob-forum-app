import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './service/storage.service';

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
    //  this.isLoggedIn = this.storageService.isLoggedIn()
    this.storageService.isLoggedIn().subscribe(data => {
      console.log(data)
      this.isLoggedIn = data
    })

  }
}
