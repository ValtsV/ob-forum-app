import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    profileImg$ = new BehaviorSubject(this.storageService.getUser().avatar)


  constructor(private http: HttpClient, protected sanitizer: DomSanitizer, private storageService: StorageService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:3333/foro/users/images', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  setProfileImg(userId: number) : void {
    this.http.get(`http://localhost:3333/foro/users/${userId}`).pipe(tap((res: any) => {
      this.storageService.saveUser(res);
    }));
  }

  // TODO: rework this
  // setProfileImgAsUploading(): void {
  //   this.profileImg$.next('assets/loading.gif')
  // }  
}
