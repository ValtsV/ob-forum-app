import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { StorageService } from 'src/app/service/storage.service';

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

  constructor(private uploadService: FileUploadService, 
              private storageService: StorageService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    this.uploadService.setProfileImgAsUploading()
    // this.isUploading(true);
    this.progress = 0;
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = 'Success'
              this.uploadService.setProfileImg(this.storageService.getUser().id)
              // this.isUploading(false)

            }
          },
          error: (err: any) => {
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFile = undefined;
    }
  }
  
  // isUploading(value: boolean) {
  //   this.uploadingImageEvent.emit(value);
  // }
}
