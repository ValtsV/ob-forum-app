import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private storageService: StorageService, private fileService: FileUploadService, protected sanitizer: DomSanitizer, private userService: UserService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser()
    this.user = user

    this.fileService.getProfileImg(user.id).subscribe((base64ImageUrl: string) => {
      this.img =
        this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageUrl);
    });
    
  }

  setIsUploading(value: boolean) {
    if (value) {
      this.img = '../../../assets/loading.gif'
    } else {
      this.fileService.getProfileImg(this.user.id).subscribe((base64ImageUrl: string) => {
        this.img =
          this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageUrl);
      })
    }
      

  }
}
