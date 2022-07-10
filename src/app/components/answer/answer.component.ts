import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/Answer';
import { AnswerService } from 'src/app/service/answer.service';
import * as moment from 'moment';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss', '../../app.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer = {} as Answer
  img: any
  timeSincePublished!: string
  @Output() voteEvent = new EventEmitter<{vote: boolean, id: number}>()

  constructor(private fileService: FileUploadService, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.timeSincePublished = moment(this.answer.updatedAt).fromNow()
    this.fileService.getProfileImg(this.answer.user.id).subscribe((base64ImageUrl: string) => {
      this.img =
        this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageUrl);
    });
  }


  giveVote(vote: boolean) {
    this.voteEvent.emit({vote, id: this.answer.id!})
  }
}
