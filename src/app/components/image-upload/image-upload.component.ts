import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  selectedFile?: File;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
    private uploadService: FileUploadService, 
    private storageService: StorageService,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {

    if (this.selectedFile) {

      this.currentFile = this.selectedFile;
      this.uploadService.upload(this.currentFile).subscribe(response => {
        if (response.type === 4) {
          const id = this.storageService.getUser().id
          this.userService.refreshUser(id);
          this.message = 'Success'
        }
      })
    }
  }
  
}
