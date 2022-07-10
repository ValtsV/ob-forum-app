import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User = {} as User
  profileImageSrc!: string
  img!: any
  @Input() currentRoute!: string


  constructor(private storageService: StorageService, private fileService: FileUploadService, protected sanitizer: DomSanitizer, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser()
    this.user = user
    this.fileService.profileImg$.subscribe(img => this.img = img)
  }
}
