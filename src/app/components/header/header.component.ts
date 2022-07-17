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
  showUserMenu: boolean = false


  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.currentUser.subscribe(user => {
      this.user = user
    })
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu
  }

  logout() {
    this.storageService.logout()
  }
}
