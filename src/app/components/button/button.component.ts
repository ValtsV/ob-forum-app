import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Course } from 'src/app/Course';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() icon!: string;
  @Input() courseId!: number
  image!: SafeResourceUrl

  @Output() btnClick = new EventEmitter()

  constructor(private fileService: FileUploadService, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
        this.fileService.getCourseImg(this.courseId).subscribe((base64ImageUrl: string) => {
          this.image= this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageUrl);
        });
      
  }

  onClick() {
    this.btnClick.emit();
  }

  

}
