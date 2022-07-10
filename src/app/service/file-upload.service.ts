import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  profileImg$ = new Subject();

  constructor(private http: HttpClient, protected sanitizer: DomSanitizer) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:3333/foro/users/images', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFile(): Observable<any> {
    // get current user id and pass it
  //   const httpOptions = new HttpHeaders({ 'withCredentials': 'true'})
  //   return this.http.get('http://localhost:3333/foro/1/image', {
  //     headers: httpOptions,
  //     responseType: 'arraybuffer'
  // });

    return this.http.get('http://localhost:3333/foro/users/1/image');
  }

  getProfileImg(userId: number) : Observable<any> {
      const httpOptions = new HttpHeaders({ 'withCredentials': 'true'})
    return this.http.get(`http://localhost:3333/foro/users/${userId}/image`, {
      headers: httpOptions,
      responseType: 'blob'
  }).pipe(switchMap((blob) => this.convertBlobToBase64(blob)));
  }


  setProfileImg(userId: number) : void {
        const httpOptions = new HttpHeaders({ 'withCredentials': 'true'})
      this.http.get(`http://localhost:3333/foro/users/${userId}/image`, {
        headers: httpOptions,
        responseType: 'blob'
    }).pipe(switchMap((blob) => this.convertBlobToBase64(blob))).subscribe(base64ImageUrl => {
      this.profileImg$.next(this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageUrl))
    });
  }

  setProfileImgAsUploading(): void {
    this.profileImg$.next('assets/loading.gif')
  }

  getCourseImg(courseId: number) : Observable<any> {
    const httpOptions = new HttpHeaders({ 'withCredentials': 'true'})
  return this.http.get(`http://localhost:3333/foro/cursos/${courseId}/image`, {
    headers: httpOptions,
    responseType: 'blob'
}).pipe(switchMap((blob) => this.convertBlobToBase64(blob)
));
}


  convertBlobToBase64(blob: Blob) {
    return new Observable((observer : Observer<any>) => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };

      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
        observer.next(event.target.error.code);
        observer.complete();
      };
    });
  }

  
}
