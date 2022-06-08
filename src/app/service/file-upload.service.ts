import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:3333/foro/images', formData, {
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

    return this.http.get('http://localhost:3333/foro/1/image');
  }

  getProfileImg(userId: number) : Observable<any> {
      const httpOptions = new HttpHeaders({ 'withCredentials': 'true'})
    return this.http.get(`http://localhost:3333/foro/${userId}/image`, {
      headers: httpOptions,
      responseType: 'blob'
  }).pipe(switchMap((blob) => this.convertBlobToBase64(blob)))
  ;
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
