import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from './service/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ob-forum-app';
  isLoggedIn: boolean = false
  currentRoute!: string
  headerBg: string = '#F8F8F9'
  

  constructor(
    private storageService: StorageService, 
    private fileService: FileUploadService,
    private router: Router, 
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    moment.locale('es')
    this.fileService.setProfileImg(this.storageService.getUser().id)
    this.router.events.subscribe((res) => { 
      this.currentRoute = this.router.url
      this.router.events.subscribe((event: any) => {
        let r = this.route;
        while (r.firstChild) {
            r = r.firstChild
        }
        r.params.subscribe(params => {
          this.router.url.split('/')[1] == 'temas' && params['id'] ? this.headerBg = '#fff' : this.headerBg = '#F8F8F9'
        });
      });
    })
    this.storageService.isLoggedInBSubject().subscribe(
      data => {
      this.isLoggedIn = data
    })

  }
}
