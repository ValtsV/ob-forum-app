import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/Course';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  errorStatus!: number
  return: string = ''
  eventBusSub?: Subscription;

  constructor(
              private storageService: StorageService, 
              private authService: AuthService, 
              private courseService: CourseService,
              private route: ActivatedRoute, 
              private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/temas');
  }

  submitLoginForm() {
    if(this.form.valid) {
      const authData = this.form.getRawValue()  
      this.authService.login(authData).subscribe({
        next: data => {
          this.storageService.saveUser(data)
          this.courseService.getCourses().subscribe({
            next: (courses: Course[]) => {
              this.courseService.setSelectedCourse(courses[0])

              // Forces app reload, to set loggedin value in app component correctly / this way login guard stays simple
              this.redirect()
            }
          })
        },
        error: err => {
          this.errorStatus = err.status
        }
      });
          
    }
  }

  redirect(){
    window.location.href=this.return
  } 

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

}
